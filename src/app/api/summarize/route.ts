import { openai } from "@/lib/openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { text } = body;

    if (!text) {
        console.error("You didn't provide any text to summarize.");
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "baidu/cobuddy:free",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful summarization assistant.",
        },
        {
          role: "user",
          content: `Summarize this text:\n\n${text}`,
        },
      ],
      temperature: 0.3,
    });

    const summary = response.choices[0].message.content;
    console.log(summary);

    return NextResponse.json({
      summary,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}