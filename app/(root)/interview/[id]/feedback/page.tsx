// import dayjs from "dayjs";
// import Link from "next/link";
// import Image from "next/image";
// import { redirect } from "next/navigation";

// import {
//   getFeedbackByInterviewId,
//   getInterviewById,
// } from "@/lib/actions/general.action";
// import { Button } from "@/components/ui/button";
// import { getCurrentUser } from "@/lib/actions/auth.actions";

// const Feedback = async ({ params }: RouteParams) => {
//   const { id } = await params;
//   const user = await getCurrentUser();

//   const interview = await getInterviewById(id);
//   if (!interview) redirect("/");

//   const feedback = await getFeedbackByInterviewId({
//     interviewId: id,
//     userId: user?.id!,
//   });

//   return (
//     <section className="section-feedback">
//       <div className="flex flex-row justify-center">
//         <h1 className="text-4xl font-semibold">
//           Feedback on the Interview -{" "}
//           <span className="capitalize">{interview.role}</span> Interview
//         </h1>
//       </div>

//       <div className="flex flex-row justify-center ">
//         <div className="flex flex-row gap-5">
//           {/* Overall Impression */}
//           <div className="flex flex-row gap-2 items-center">
//             <Image src="/star.svg" width={22} height={22} alt="star" />
//             <p>
//               Overall Impression:{" "}
//               <span className="text-primary-200 font-bold">
//                 {feedback?.totalScore}
//               </span>
//               /100
//             </p>
//           </div>

//           {/* Date */}
//           <div className="flex flex-row gap-2">
//             <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
//             <p>
//               {feedback?.createdAt
//                 ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
//                 : "N/A"}
//             </p>
//           </div>
//         </div>
//       </div>

//       <hr />

//       <p>{feedback?.finalAssessment}</p>

//       {/* Interview Breakdown */}
//       <div className="flex flex-col gap-4">
//         <h2>Breakdown of the Interview:</h2>
//         {feedback?.categoryScores?.map((category, index) => (
//           <div key={index}>
//             <p className="font-bold">
//               {index + 1}. {category.name} ({category.score}/100)
//             </p>
//             <p>{category.comment}</p>
//           </div>
//         ))}
//       </div>

//       <div className="flex flex-col gap-3">
//         <h3>Strengths</h3>
//         <ul>
//           {feedback?.strengths?.map((strength, index) => (
//             <li key={index}>{strength}</li>
//           ))}
//         </ul>
//       </div>

//       <div className="flex flex-col gap-3">
//         <h3>Areas for Improvement</h3>
//         <ul>
//           {feedback?.areasForImprovement?.map((area, index) => (
//             <li key={index}>{area}</li>
//           ))}
//         </ul>
//       </div>

//       <div className="buttons">
//         <Button className="btn-secondary flex-1">
//           <Link href="/" className="flex w-full justify-center">
//             <p className="text-sm font-semibold text-primary-200 text-center">
//               Back to dashboard
//             </p>
//           </Link>
//         </Button>

//         <Button className="btn-primary flex-1">
//           <Link
//             href={`/interview/${id}`}
//             className="flex w-full justify-center"
//           >
//             <p className="text-sm font-semibold text-black text-center">
//               Retake Interview
//             </p>
//           </Link>
//         </Button>
//       </div>
//     </section>
//   );
// };

// export default Feedback;

// import dayjs from "dayjs";
// import Link from "next/link";
// import Image from "next/image";
// import { redirect } from "next/navigation";
// import {
//     getFeedbackByInterviewId,
//     getInterviewById,
// } from "@/lib/actions/general.action";
// import { getCurrentUser } from "@/lib/actions/auth.actions";
// const Feedback = async ({ params }: { params: { id: string } }) => {
//     const { id } = params;
//     const user = await getCurrentUser();

//     if (!user) redirect("/auth/sign-in");

//     const [interview, feedback] = await Promise.all([
//         getInterviewById(id),
//         getFeedbackByInterviewId({
//             interviewId: id,
//             userId: user.id,
//         }),
//     ]);

//     if (!interview) redirect("/");

//     if (!feedback) {
//         return (
//             <div className="flex flex-col items-center justify-center h-screen gap-4">
//                 <h1 className="text-2xl font-semibold">Feedback Not Available Yet</h1>
//                 <p>Your interview feedback is still being processed.</p>
//                 <Link href="/" className="btn-primary">
//                     Back to Dashboard
//                 </Link>
//             </div>
//         );
//     }

//     return (
//         <section className="max-w-4xl mx-auto p-6 space-y-6">
//             <div className="text-center">
//                 <h1 className="text-4xl font-semibold mb-2">
//                     Interview Feedback - {interview.role}
//                 </h1>
//                 <div className="flex justify-center gap-6 items-center">
//                     <div className="flex items-center gap-2">
//                         <Image src="/star.svg" width={22} height={22} alt="star" />
//                         <span className="font-medium">
//                             Score: <span className="text-primary-500">{feedback.totalScore}/100</span>
//                         </span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                         <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
//                         <span>
//                             {dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")}
//                         </span>
//                     </div>
//                 </div>
//             </div>

//             <div className="space-y-8">
//                 {/* Final Assessment */}
//                 <div className="bg-gray-50 p-6 rounded-lg">
//                     <h2 className="text-2xl font-semibold mb-4">Overall Assessment</h2>
//                     <p className="whitespace-pre-line">{feedback.finalAssessment}</p>
//                 </div>

//                 {/* Category Scores */}
//                 <div className="space-y-6">
//                     <h2 className="text-2xl font-semibold">Detailed Evaluation</h2>
//                     <div className="grid md:grid-cols-2 gap-4">
//                         {Object.entries(feedback.categoryScores).map(([categoryName, score]) => (
//                             <div key={categoryName} className="bg-gray-50 p-4 rounded-lg">
//                                 <div className="flex justify-between items-center mb-2">
//                                     <h3 className="font-semibold">
//                                         {categoryName
//                                             .replace(/([A-Z])/g, " $1") // split camelCase
//                                             .replace(/^./, (str) => str.toUpperCase())}
//                                     </h3>
//                                     <span className="font-medium">{score}/100</span>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>


//                 {/* Strengths & Improvements */}
//                 <div className="grid md:grid-cols-2 gap-6">
//                     <div className="bg-green-50 p-6 rounded-lg">
//                         <h3 className="text-xl font-semibold mb-3 text-green-800">Strengths</h3>
//                         <ul className="space-y-2">
//                             {feedback.strengths.map((strength, index) => (
//                                 <li key={index} className="flex items-start gap-2">
//                                     <Image src="/check.svg" width={16} height={16} alt="check" />
//                                     <span>{strength}</span>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                     <div className="bg-red-50 p-6 rounded-lg">
//                         <h3 className="text-xl font-semibold mb-3 text-red-800">Areas for Improvement</h3>
//                         <ul className="space-y-2">
//                             {feedback.areasForImprovement.map((area, index) => (
//                                 <li key={index} className="flex items-start gap-2">
//                                     <Image src="/improve.svg" width={16} height={16} alt="improve" />
//                                     <span>{area}</span>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
//                 <Link href="/" className="btn-secondary flex-1 max-w-md">
//                     Back to Dashboard
//                 </Link>
//                 <Link
//                     href={`/interview/${id}`}
//                     className="btn-primary flex-1 max-w-md"
//                 >
//                     Retake Interview
//                 </Link>
//             </div>
//         </section>
//     );
// };

// export default Feedback;

import dayjs from "dayjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
    getFeedbackByInterviewId,
    getInterviewById,
} from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.actions";

const Feedback = async ({ params }: { params: { id: string } }) => {
    // Properly destructure params after awaiting
    const id = params.id;
    const user = await getCurrentUser();

    if (!user) redirect("/auth/sign-in");

    const [interview, feedback] = await Promise.all([
        getInterviewById(id),
        getFeedbackByInterviewId({
            interviewId: id,
            userId: user.id,
        }),
    ]);

    if (!interview) redirect("/");

    if (!feedback) {
        return (
            <div className="flex flex-col items-center justify-center h-screen gap-4 bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-gray-800">Feedback Not Available Yet</h1>
                <p className="text-gray-600">Your interview feedback is still being processed.</p>
                <Link 
                    href="/" 
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    Back to Dashboard
                </Link>
            </div>
        );
    }

    return (
        <section className="max-w-4xl mx-auto p-6 space-y-6 bg-white rounded-lg shadow-lg">
            {/* Header Section */}
            <div className="text-center">
                <h1 className="text-4xl font-semibold mb-2 text-gray-800">
                    Interview Feedback - <span className="text-blue-600">{interview.role}</span>
                </h1>
                <div className="flex justify-center gap-6 items-center mt-4">
                    <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                        <span className="text-yellow-500">★</span>
                        <span className="font-medium text-gray-700">
                            Score: <span className="text-blue-600 font-bold">{feedback.totalScore}/100</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                        <span className="text-gray-500">📅</span>
                        <span className="text-gray-700">
                            {dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")}
                        </span>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-6"></div>

            {/* Content Sections */}
            <div className="space-y-8">
                {/* Final Assessment */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Overall Assessment</h2>
                    <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                        {feedback.finalAssessment}
                    </p>
                </div>

                {/* Category Scores - Fixed display */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Detailed Evaluation</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {Object.entries(feedback.categoryScores).map(([categoryName, score]) => (
                            <div key={categoryName} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-semibold text-gray-800">
                                        {categoryName
                                            .replace(/([A-Z])/g, " $1")
                                            .replace(/^./, (str) => str.toUpperCase())}
                                    </h3>
                                    <span className="font-medium text-blue-600">{score}/100</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div 
                                        className="bg-blue-600 h-2.5 rounded-full" 
                                        style={{ width: `${score}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Strengths & Improvements - Using text emojis instead of SVGs */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                        <h3 className="text-xl font-semibold mb-3 text-green-800">✅ Strengths</h3>
                        <ul className="space-y-3">
                            {feedback.strengths.map((strength, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="text-gray-700">• {strength}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                        <h3 className="text-xl font-semibold mb-3 text-red-800">⚠️ Areas for Improvement</h3>
                        <ul className="space-y-3">
                            {feedback.areasForImprovement.map((area, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="text-gray-700">• {area}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Link 
                    href="/" 
                    className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors text-center font-medium"
                >
                    Back to Dashboard
                </Link>
                <Link
                    href={`/interview/${id}`}
                    className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center font-medium"
                >
                    Retake Interview
                </Link>
            </div>
        </section>
    );
};

export default Feedback;