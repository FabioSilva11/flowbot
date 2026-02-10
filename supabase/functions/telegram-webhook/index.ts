import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface TelegramUpdate {
  update_id: number;
  message?: {
    message_id: number;
    from: { id: number; first_name: string; username?: string };
    chat: { id: number; type: string };
    text?: string;
    date: number;
  };
  callback_query?: {
    id: string;
    from: { id: number; first_name: string };
    message: { chat: { id: number } };
    data: string;
  };
}

interface FlowNode {
  id: string;
  type: string;
  data: {
    type: string;
    label: string;
    content?: string;
    buttons?: { id: string; text: string }[];
    condition?: string;
    action?: string;
    delay?: number;
    delayUnit?: string;
    imageUrl?: string;
    caption?: string;
    promptText?: string;
    variableName?: string;
    latitude?: number;
    longitude?: number;
    locationTitle?: string;
    httpUrl?: string;
    httpMethod?: string;
    httpHeaders?: string;
    httpBody?: string;
  };
}

interface FlowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
}

const TELEGRAM_API = "https://api.telegram.org/bot";

async function sendTelegramMessage(token: string, chatId: number, text: string, buttons?: { id: string; text: string }[]) {
  const body: any = { chat_id: chatId, text, parse_mode: "HTML" };
  if (buttons && buttons.length > 0) {
    body.reply_markup = { inline_keyboard: buttons.map((btn) => [{ text: btn.text, callback_data: btn.id }]) };
  }
  const res = await fetch(`${TELEGRAM_API}${token}/sendMessage`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  return res.json();
}

async function sendTelegramPhoto(token: string, chatId: number, photoUrl: string, caption?: string) {
  const body: any = { chat_id: chatId, photo: photoUrl };
  if (caption) body.caption = caption;
  const res = await fetch(`${TELEGRAM_API}${token}/sendPhoto`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  return res.json();
}

async function sendTelegramLocation(token: string, chatId: number, latitude: number, longitude: number) {
  const res = await fetch(`${TELEGRAM_API}${token}/sendLocation`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chat_id: chatId, latitude, longitude }) });
  return res.json();
}

async function answerCallbackQuery(token: string, callbackQueryId: string) {
  await fetch(`${TELEGRAM_API}${token}/answerCallbackQuery`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ callback_query_id: callbackQueryId }) });
}

function findNextNodesDefault(edges: FlowEdge[], currentNodeId: string): string[] {
  return edges.filter((e) => e.source === currentNodeId).map((e) => e.target);
}

function findNodeById(nodes: FlowNode[], id: string): FlowNode | undefined {
  return nodes.find((n) => n.id === id);
}

function findStartNode(nodes: FlowNode[]): FlowNode | undefined {
  return nodes.find((n) => n.type === "start");
}

function replaceVariables(text: string, variables: Record<string, any>): string {
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => variables[key] !== undefined ? String(variables[key]) : `{{${key}}}`);
}

function evaluateCondition(condition: string, userMessage: string, variables: Record<string, any>): boolean {
  try {
    const ctx = { ...variables, "user.message": userMessage, message: userMessage };
    if (condition.includes("==")) {
      const [left, right] = condition.split("==").map((s) => s.trim());
      const leftVal = left === "user.message" || left === "message" ? userMessage : ctx[left] || left;
      return leftVal === right.replace(/['"]/g, "");
    }
    if (condition.includes("!=")) {
      const [left, right] = condition.split("!=").map((s) => s.trim());
      const leftVal = left === "user.message" || left === "message" ? userMessage : ctx[left] || left;
      return leftVal !== right.replace(/['"]/g, "");
    }
    if (condition.includes("contains")) {
      const match = condition.match(/(.+)\.contains\(["'](.+)["']\)/);
      if (match) {
        const leftVal = match[1].trim() === "user.message" ? userMessage : ctx[match[1].trim()] || "";
        return leftVal.includes(match[2]);
      }
    }
    return false;
  } catch { return false; }
}

async function continueFromNode(nodeId: string, nodes: FlowNode[], edges: FlowEdge[], token: string, chatId: number, userMessage: string, variables: Record<string, any>, supabase: any, flowId: string): Promise<void> {
  const nextIds = findNextNodesDefault(edges, nodeId);
  for (const nextId of nextIds) {
    const nextNode = findNodeById(nodes, nextId);
    if (nextNode) await processNode(nextNode, nodes, edges, token, chatId, userMessage, variables, supabase, flowId);
  }
}

async function processNode(node: FlowNode, nodes: FlowNode[], edges: FlowEdge[], token: string, chatId: number, userMessage: string, variables: Record<string, any>, supabase: any, flowId: string): Promise<void> {
  switch (node.type) {
    case "start":
      await continueFromNode(node.id, nodes, edges, token, chatId, userMessage, variables, supabase, flowId);
      break;
    case "message":
      if (node.data.content) await sendTelegramMessage(token, chatId, replaceVariables(node.data.content, variables));
      await continueFromNode(node.id, nodes, edges, token, chatId, userMessage, variables, supabase, flowId);
      break;
    case "image":
      if (node.data.imageUrl) {
        const caption = node.data.caption ? replaceVariables(node.data.caption, variables) : undefined;
        await sendTelegramPhoto(token, chatId, node.data.imageUrl, caption);
      }
      await continueFromNode(node.id, nodes, edges, token, chatId, userMessage, variables, supabase, flowId);
      break;
    case "buttonReply":
      if (node.data.buttons && node.data.buttons.length > 0) {
        const text = node.data.content ? replaceVariables(node.data.content, variables) : node.data.label || "Escolha uma opção:";
        await sendTelegramMessage(token, chatId, text, node.data.buttons);
        await supabase.from("bot_sessions").upsert({ flow_id: flowId, telegram_chat_id: chatId, current_node_id: node.id, variables }, { onConflict: "flow_id,telegram_chat_id" });
      }
      break;
    case "userInput":
      if (node.data.promptText) await sendTelegramMessage(token, chatId, replaceVariables(node.data.promptText, variables));
      await supabase.from("bot_sessions").upsert({ flow_id: flowId, telegram_chat_id: chatId, current_node_id: node.id, variables }, { onConflict: "flow_id,telegram_chat_id" });
      break;
    case "condition": {
      const result = evaluateCondition(node.data.condition || "", userMessage, variables);
      const outEdges = edges.filter((e) => e.source === node.id);
      const nextEdge = result ? outEdges.find((e) => e.sourceHandle === "yes") || outEdges[0] : outEdges.find((e) => e.sourceHandle === "no") || outEdges[1];
      if (nextEdge) {
        const nextNode = findNodeById(nodes, nextEdge.target);
        if (nextNode) await processNode(nextNode, nodes, edges, token, chatId, userMessage, variables, supabase, flowId);
      }
      break;
    }
    case "location":
      if (node.data.latitude && node.data.longitude) await sendTelegramLocation(token, chatId, node.data.latitude, node.data.longitude);
      await continueFromNode(node.id, nodes, edges, token, chatId, userMessage, variables, supabase, flowId);
      break;
    case "httpRequest":
      if (node.data.httpUrl) {
        try {
          const url = replaceVariables(node.data.httpUrl, variables);
          const method = node.data.httpMethod || "GET";
          const headers: Record<string, string> = { "Content-Type": "application/json" };
          if (node.data.httpHeaders) { try { Object.assign(headers, JSON.parse(replaceVariables(node.data.httpHeaders, variables))); } catch {} }
          const fetchOptions: any = { method, headers };
          if ((method === "POST" || method === "PUT") && node.data.httpBody) fetchOptions.body = replaceVariables(node.data.httpBody, variables);
          const res = await fetch(url, fetchOptions);
          const responseData = await res.text();
          variables.http_response = responseData;
          variables.http_status = res.status;
          try { variables.http_json = JSON.parse(responseData); } catch {}
        } catch (err) { variables.http_error = String(err); }
      }
      await continueFromNode(node.id, nodes, edges, token, chatId, userMessage, variables, supabase, flowId);
      break;
    case "delay": {
      const delay = node.data.delay || 1;
      const unit = node.data.delayUnit || "seconds";
      let ms = delay * 1000;
      if (unit === "minutes") ms = delay * 60 * 1000;
      if (unit === "hours") ms = delay * 60 * 60 * 1000;
      ms = Math.min(ms, 25000);
      await new Promise((resolve) => setTimeout(resolve, ms));
      await continueFromNode(node.id, nodes, edges, token, chatId, userMessage, variables, supabase, flowId);
      break;
    }
    case "action":
      console.log(`Action: ${node.data.action} for chat ${chatId}`);
      await continueFromNode(node.id, nodes, edges, token, chatId, userMessage, variables, supabase, flowId);
      break;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const update: TelegramUpdate = await req.json();
    console.log("Telegram update:", JSON.stringify(update));

    let chatId: number | undefined;
    let userMessage = "";
    let isCallbackQuery = false;
    let callbackData = "";

    if (update.callback_query) {
      chatId = update.callback_query.message.chat.id;
      callbackData = update.callback_query.data;
      userMessage = callbackData;
      isCallbackQuery = true;
    } else if (update.message?.text) {
      chatId = update.message.chat.id;
      userMessage = update.message.text;
    }

    if (!chatId) return new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });

    // Get all active flows with their bot tokens
    const { data: flows } = await supabase
      .from("bot_flows")
      .select("*, bots!bot_flows_bot_id_fkey(telegram_token)")
      .eq("is_active", true);

    if (!flows || flows.length === 0) {
      console.log("No active flows found");
      return new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Try each active flow - the webhook URL is the same for all bots
    // Telegram sends the update to the webhook that was set for the specific bot token
    // So we need to find which flow matches
    for (const flow of flows) {
      const token = (flow as any).bots?.telegram_token;
      if (!token) continue;

      const nodes: FlowNode[] = flow.nodes as any;
      const edges: FlowEdge[] = flow.edges as any;
      const flowId = flow.id;

      if (isCallbackQuery) {
        await answerCallbackQuery(token, update.callback_query!.id);
      }

      // Check for existing session
      const { data: sessions } = await supabase
        .from("bot_sessions")
        .select("*")
        .eq("flow_id", flowId)
        .eq("telegram_chat_id", chatId)
        .limit(1);

      const session = sessions?.[0];

      if (session?.current_node_id) {
        const currentNode = findNodeById(nodes, session.current_node_id);

        if (isCallbackQuery && currentNode?.type === "buttonReply") {
          const btnHandle = `btn-${callbackData}`;
          const specificEdges = edges.filter((e) => e.source === currentNode.id && e.sourceHandle === btnHandle);
          const edgesToFollow = specificEdges.length > 0 ? specificEdges : edges.filter((e) => e.source === currentNode.id && e.sourceHandle === "default");
          const variables = { ...session.variables, last_button: callbackData };

          for (const edge of edgesToFollow) {
            const nextNode = findNodeById(nodes, edge.target);
            if (nextNode) await processNode(nextNode, nodes, edges, token, chatId, callbackData, variables, supabase, flowId);
          }

          await supabase.from("bot_sessions").delete().eq("flow_id", flowId).eq("telegram_chat_id", chatId);
          break;
        } else if (!isCallbackQuery && currentNode?.type === "userInput") {
          const varName = currentNode.data.variableName || "user_response";
          const variables = { ...session.variables, [varName]: userMessage };
          await supabase.from("bot_sessions").delete().eq("flow_id", flowId).eq("telegram_chat_id", chatId);
          await continueFromNode(currentNode.id, nodes, edges, token, chatId, userMessage, variables, supabase, flowId);
          break;
        }
      } else {
        const startNode = findStartNode(nodes);
        if (startNode) {
          const triggerCommand = startNode.data.content || "/start";
          if (userMessage === triggerCommand || userMessage === "/start") {
            await supabase.from("bot_sessions").delete().eq("flow_id", flowId).eq("telegram_chat_id", chatId);
            await processNode(startNode, nodes, edges, token, chatId, userMessage, {}, supabase, flowId);
            break;
          }
        }
      }
    }

    return new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
