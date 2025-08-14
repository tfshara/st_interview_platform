'use server';
import { feedbackSchema } from "@/constants";
import { db } from "@/firebase/admin";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { success } from "zod";
export async function getInterviewsByUserId(userId: string): Promise<Interview[] | null> {
    const interviews = await db
        .collection('interviews')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get();

    return interviews.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    })) as Interview[]
}

export async function getLatestInterviews(params: GetLatestInterviewsParams): Promise<Interview[] | null> {
    const { userId, limit = 20 } = params;
    const interviews = await db
        .collection('interviews')
        .orderBy('createdAt', 'desc')
        .where('finalized', '==', true)
        .where('userId', '!=', userId)
        .limit(limit)
        .get();

    return interviews.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    })) as Interview[]
}

export async function getInterviewById(id: string): Promise<Interview | null> {
    const interview = await db
        .collection('interviews')
        .doc(id)
        .get();

    return interview.data() as Interview | null;
}

// export async function createFeedback(params: CreateFeedbackParams) {
//     const { interviewId, userId, transcript } = params;
//     try {
//         const formattedTranscript = transcript
//             .map((sentence: { role: string, content: string }) => (
//                 `- ${sentence.role}:${sentence.content}\n`
//             )).join('');

//         const { object :{totalScore,categoryScores,strengths,areasForImprovement,finalAssessment}} = await generateObject({
//             model: google("gemini-2.0-flash-001", {
//                 structuredOutputs: false,
//             }),
//             schema: feedbackSchema,
//             prompt: `
//         You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
//         Transcript:
//         ${formattedTranscript}

//         Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
//         - **Communication Skills**: Clarity, articulation, structured responses.
//         - **Technical Knowledge**: Understanding of key concepts for the role.
//         - **Problem-Solving**: Ability to analyze problems and propose solutions.
//         - **Cultural & Role Fit**: Alignment with company values and job role.
//         - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
//         `,
//             system:
//                 "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
//         });

//         const feedback=await db.collection('feedback').add({
//             interviewId,
//             userId,
//             totalScore,
//             categoryScores,
//             strengths,
//             areasForImprovement,
//             finalAssessment,
//             createdAt:new Date().toISOString()
//         })
//        return{
//         success:true,
//         feedback:feedback.id
//        }
//     } catch (e) {
//         console.error("Error saving feedback", e)
//         return{success:false}
//     }
// }
export async function createFeedback(params: CreateFeedbackParams) {
    const { interviewId, userId, transcript } = params;
    try {
        const formattedTranscript = transcript
            .map((sentence: { role: string, content: string }) => 
                `${sentence.role}: ${sentence.content}\n`
            ).join('');

        // Get the structured output
        const { object } = await generateObject({
            model: google("gemini-2.0-flash-001"),
            schema: feedbackSchema,
            prompt: `
You are an AI interviewer analyzing a mock interview. Evaluate the candidate thoroughly and be brutally honest:

Transcript:
${formattedTranscript}

Score the candidate (0-100) in these exact categories:
1. Communication Skills
2. Technical Knowledge  
3. Problem-Solving
4. Cultural & Role Fit
5. Confidence & Clarity

Provide:
- Total score (0-100)
- Scores for each category
- 3-5 key strengths
- 3-5 areas for improvement
- Final assessment paragraph
`,
            system: "You are a professional interviewer analyzing a mock interview."
        });

        // Save to Firestore
        const feedbackRef = await db.collection('feedback').add({
            interviewId,
            userId,
            ...object, // Spread the structured output
            createdAt: new Date().toISOString()
        });

        return {
            success: true,
            feedback: feedbackRef.id
        };
    } catch (e) {
        console.error("Error saving feedback", e);
        return { success: false };
    }
}

// export async function getFeedbackByInterviewId(params: GetFeedbackByInterviewIdParams): Promise<Feedback| null> {
//     const { interviewId,userId } = params;
//     const feedback = await db
//         .collection('feedback')
//         .where('interviewId', '==', interviewId)
//         .where('userId', '==', userId)
//         .limit(1)
//         .get();
//        if (feedback.empty) return null;

//   const feedbackDoc = feedback.docs[0];
//   return { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
// }
export async function getFeedbackByInterviewId(params: {
  interviewId: string;
  userId: string;
}): Promise<Feedback | null> {
  const { interviewId, userId } = params;
  
  const feedbackDoc = await db.collection('feedback')
    .where('interviewId', '==', interviewId)
    .where('userId', '==', userId)
    .limit(1)
    .get();

  if (feedbackDoc.empty) return null;

  return {
    id: feedbackDoc.docs[0].id,
    ...feedbackDoc.docs[0].data()
  } as Feedback;
}