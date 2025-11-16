import type { Route } from "../+types";
import {
  type UIMessage,
  streamText,
  convertToModelMessages,
  createUIMessageStream,
  stepCountIs,
  createUIMessageStreamResponse,
} from "ai";
import { getModel } from "~/lib/utils/get-model";

export async function action({ request }: Route.ActionArgs) {
  try {
    const json = await request.json();
    const messages: UIMessage[] = json.messages;

    const model = getModel();

    const stream = createUIMessageStream({
      execute: ({ writer }) => {
        const result = streamText({
          model,
          messages: convertToModelMessages(messages),
          stopWhen: stepCountIs(5),
          system: `You are a helpful AI assistant answering questions about the portfolio owner's experience, projects, and background. Be concise, professional, and friendly.`,
        });
        writer.merge(result.toUIMessageStream());
      },
    });

    return createUIMessageStreamResponse({ stream });
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
