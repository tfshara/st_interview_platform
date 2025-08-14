// 'use client'
// import { cn } from '@/lib/utils';
// import Image from 'next/image'
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import VAPI from '@vapi-ai/web';
// import { interviewer } from "@/constants";

// enum CallStatus {
//     INACTIVE = 'INACTIVE',
//     CONNECTING = 'CONNECTING',
//     ACTIVE = 'ACTIVE',
//     FINISHED = 'FINISHED',
// }

// interface SavedMessage {
//     role: 'user' | 'system' | 'assistant';
//     content: string;
// }

// interface AgentProps {
//     userName: string;
//     userId: string;
//     type: string;
//     questions?: string[];
// }

// const Agent = ({ userName, userId, type, questions,interviewId }: AgentProps) => {
//     const router = useRouter();
//     const [isSpeaking, setIsSpeaking] = useState(false);
//     const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
//     const [messages, setMessages] = useState<SavedMessage[]>([]);
//     const [vapi, setVapi] = useState<VAPI | null>(null);

//     // Initialize VAPI
//     useEffect(() => {
//         const initializeVapi = async () => {
//             try {
//                 if (!process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN) {
//                     throw new Error("VAPI public key is missing");
//                 }

//                 const vapiInstance = new VAPI(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN);
//                 setVapi(vapiInstance);

//                 const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
//                 const onCallEnd = () => setCallStatus(CallStatus.FINISHED);
//                 const onMessage = (message: any) => {
//                     if (message.type === 'transcript' && message.transcriptType === 'final') {
//                         const newMessage = { role: message.role, content: message.transcript };
//                         setMessages((prev) => [...prev, newMessage]);
//                     }
//                 };
//                 const onSpeechStart = () => setIsSpeaking(true);
//                 const onSpeechEnd = () => setIsSpeaking(false);
//                 const onError = (error: Error) => console.error('VAPI Error:', error);

//                 vapiInstance.on('call-start', onCallStart);
//                 vapiInstance.on('call-end', onCallEnd);
//                 vapiInstance.on('message', onMessage);
//                 vapiInstance.on('speech-start', onSpeechStart);
//                 vapiInstance.on('speech-end', onSpeechEnd);
//                 vapiInstance.on("error", (err) => {
//                     if (
//                         err?.message?.includes("Meeting ended due to ejection") ||
//                         err?.message?.includes("Meeting has ended")
//                     ) {
//                         return; // skip logging this
//                     }
//                     console.error("VAPI Error:", err);
//                 });


//                 return () => {
//                     vapiInstance.off('call-start', onCallStart);
//                     vapiInstance.off('call-end', onCallEnd);
//                     vapiInstance.off('message', onMessage);
//                     vapiInstance.off('speech-start', onSpeechStart);
//                     vapiInstance.off('speech-end', onSpeechEnd);
//                     vapiInstance.off('error', onError);
//                     vapiInstance.stop();
//                 };
//             } catch (error) {
//                 console.error('VAPI initialization failed:', error);
//             }
//         };

//         initializeVapi();
//     }, []);
//     const handleGenerateFeedback=async (messages:
//         SavedMessage[])=>{
//             console.log("generate feedback here");
//             const {success,id}={
//                 success:true,
//                 id:'feedback-id'
//             }
//             if(success && id){
//                 router.push(`/interview/${interviewId}/feedback`)
//             }
//             else{
//                 console.log("error saving this")
//                 router.push('/')
//             }
//         }
//     useEffect(() => {
//         if (callStatus === CallStatus.FINISHED){
//             if(type==='generate'){
//                 router.push('/')
//             }
//             else{
//                 handleGenerateFeedback(messages)
//             }
//         }
//     }, [callStatus, router]);

//     // const handleCall = async () => {
//     //     if (!vapi) {
//     //         console.error("VAPI not initialized");
//     //         return;
//     //     }

//     //     setCallStatus(CallStatus.CONNECTING);
//     //     try {
//     //         if (type === "generate") {
//     //             console.log("Starting workflow call...");
//     //             const response = await vapi.start(
//     //                 undefined,
//     //                 undefined,
//     //                 undefined,
//     //                 process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!,
//     //                 {
//     //                     variableValues: {
//     //                         username: userName,
//     //                         userid: userId,
//     //                     },
//     //                 }
//     //             );
//     //             console.log("Call response:", response);
//     //         } else {
//     //             console.log("Starting assistant call...");
//     //             let formattedQuestions = "";
//     //             if (questions) {
//     //                 formattedQuestions = questions
//     //                     .map((question) => `- ${question}`)
//     //                     .join("\n");
//     //             }

//     //             const response = await vapi.start(interviewer, {
//     //                 variableValues: {
//     //                     questions: formattedQuestions,
//     //                 },
//     //             });
//     //             console.log("Call response:", response);
//     //         }
//     //     } catch (error) {
//     //         console.error("Call failed:", error);
//     //         setCallStatus(CallStatus.INACTIVE);
//     //     }
//     // };


//     const handleCall = async () => {
//         if (!vapi) {
//             console.error("VAPI not initialized");
//             return;
//         }

//         setCallStatus(CallStatus.CONNECTING);
//         try {
//             if (type === "generate") {
//                 console.log("Starting workflow call...");
//                 const response = await vapi.start(
//                     undefined, // assistantId
//                     undefined, // phoneNumber
//                     undefined, // sipUri
//                     process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!,
//                     {
//                         variableValues: {
//                             username: userName,
//                             userid: userId,
//                         },
//                     }
//                 );
//                 console.log("Call response:", response);
//             } else {
//                 console.log("Starting interviewer workflow call...");
//                 let formattedQuestions = "";
//                 if (questions) {
//                     formattedQuestions = questions
//                         .map((question) => `- ${question}`)
//                         .join("\n");
//                 }

//                 const response = await vapi.start(
//                     undefined, // assistantId
//                     undefined, // phoneNumber
//                     undefined, // sipUri
//                     interviewer, // <-- interviewer must be a workflow ID here
//                     {
//                         variableValues: {
//                             questions: formattedQuestions,
//                         },
//                     }
//                 );
//                 console.log("Call response:", response);
//             }
//         } catch (error) {
//             console.error("Call failed:", error);
//             setCallStatus(CallStatus.INACTIVE);
//         }
//     };

//     const handleDisconnect = async () => {
//         if (vapi) {
//             setCallStatus(CallStatus.FINISHED);
//             await vapi.stop();
//         }
//     };

//     const latestMessage = messages[messages.length - 1]?.content;
//     const isCallInactiveOrFinished = callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;

//     return (
//         <>
//             <div className="call-view flex items-center justify-center gap-10 flex-wrap p-4">
//                 {/* Interviewer Card */}
//                 <div className="card w-94 h-72 bg-[#1a1a2e] rounded-xl shadow-md flex flex-col items-center justify-center relative">
//                     <div className="avatar relative">
//                         <Image src="/ai-avatar.png" alt="AI Interviewer" width={80} height={80} className="object-cover rounded-full" />
//                         {isSpeaking && <span className="animate-speak" />}
//                     </div>
//                     <h3 className="mt-4 text-white text-lg font-semibold">AI Interviewer</h3>
//                 </div>

//                 {/* User Card */}
//                 <div className="card w-94 h-72 bg-[#1a1a2e] rounded-xl shadow-md flex flex-col items-center justify-center">
//                     <div className="avatar mb-4">
//                         <Image
//                             src="/user-avatar.png"
//                             alt="user avatar"
//                             width={120}
//                             height={120}
//                             className="rounded-full object-cover"
//                         />
//                     </div>
//                     <h3 className="text-white text-lg font-semibold">{userName}</h3>
//                 </div>
//             </div>

//             {messages.length > 0 && (
//                 <div className='transcript-border p-2 max-w-md mx-auto'>
//                     <div className='transcript'>
//                         <p key={latestMessage} className={cn('transition-opacity duration-500 opacity-0', 'animate-fadeIn opacity-100')}>
//                             {latestMessage}
//                         </p>
//                     </div>
//                 </div>
//             )}
//             <div className="w-full flex justify-center">
//                 {callStatus !== 'ACTIVE' ? (
//                     <button className='relative btn-call' onClick={handleCall} disabled={!vapi || callStatus === CallStatus.CONNECTING}>
//                         <span className={cn('absolute animate-ping rounded-full opacity-75 ', callStatus !== 'CONNECTING' && 'hidden')} />
//                         <span>
//                             {isCallInactiveOrFinished ? 'Call' : 'Connecting...'}
//                         </span>
//                     </button>
//                 ) : (
//                     <button className='btn-disconnect' onClick={handleDisconnect}>
//                         End
//                     </button>
//                 )}
//             </div>
//         </>
//     );
// };

// export default Agent;

'use client'
import { cn } from '@/lib/utils';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import VAPI from '@vapi-ai/web';
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
import { interviewer } from "@/constants";
import { createFeedback } from '@/lib/actions/general.action';

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}

interface AgentProps {
    userName: string;
    userId: string;
    type: string;
    questions?: string[];
    interviewId:string;
    feedbackId:string;
}
interface SavedMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

const Agent = ({ userName, userId, type, questions,interviewId, feedbackId, }: AgentProps) => {
    const router = useRouter();
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    // const [messages, setMessages] = useState([]);
      const [messages, setMessages] = useState<SavedMessage[]>([]);
    const [vapi, setVapi] = useState<VAPI | null>(null);

    useEffect(() => {
        const vapiInstance = new VAPI(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!);
        
        const handleMessage = (message: any) => {
            if (message.type === 'transcript' && message.transcriptType === 'final') {
                setMessages(prev => [...prev, {
                    role: message.role,
                    content: message.transcript
                }]);
            }
        };

        vapiInstance.on('call-start', () => setCallStatus(CallStatus.ACTIVE));
        vapiInstance.on('call-end', () => setCallStatus(CallStatus.FINISHED));
        vapiInstance.on('message', handleMessage);
        vapiInstance.on('speech-start', () => setIsSpeaking(true));
        vapiInstance.on('speech-end', () => setIsSpeaking(false));

        setVapi(vapiInstance);

        return () => {
            vapiInstance.off('message', handleMessage);
            vapiInstance.stop();
        };
    }, []);
    const handleGenerateFeedback=async (messages:
        SavedMessage[])=>{
            console.log("generate feedback here");
            const {success,feedbackId:id}=await createFeedback({
               interviewId:interviewId!,
               userId:userId!,
               transcript:messages,
               feedbackId,
            });
            if(success && id){
                router.push(`/interview/${interviewId}/feedback`)
            }
            else{
                console.log("error saving this")
                router.push('/')
            }
        }
    useEffect(() => {
        if (callStatus === CallStatus.FINISHED){
            if(type==='generate'){
                router.push(`/feedback/${interviewId}`)
            }
            else{
                handleGenerateFeedback(messages)
            }
        }
    }, [callStatus, router]);
    const handleCall = async () => {
        if (!vapi) return;
        
        setCallStatus(CallStatus.CONNECTING);
        try {
            if (type === "generate") {
                await vapi.start(
                    undefined,
                    undefined,
                    undefined,
                    process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID,
                    { variableValues: { username: userName, userid: userId } }
                );
            } else {
                // Properly typed assistant call
                await vapi.start<CreateAssistantDTO>(interviewer, {
                    variableValues: { questions: questions?.join("\n") || "" }
                });
            }
        } catch (error) {
            console.error("Call failed:", error);
            setCallStatus(CallStatus.INACTIVE);
        }
    };

    const handleDisconnect = async () => {
        if (vapi) {
            await vapi.stop();
            setCallStatus(CallStatus.FINISHED);
        }
    };

    // const latestMessage = messages[messages.length - 1]?.content;
    const latestMessage = messages.length > 0 ? messages[messages.length - 1].content : "";
    const isCallInactiveOrFinished = callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;

    return (
        <>
            <div className="call-view flex items-center justify-center gap-10 flex-wrap p-4">
                <div className="card w-94 h-72 bg-[#1a1a2e] rounded-xl shadow-md flex flex-col items-center justify-center relative">
                    <div className="avatar relative">
                        <Image src="/ai-avatar.png" alt="AI Interviewer" width={80} height={80} className="object-cover rounded-full" />
                        {isSpeaking && <span className="animate-speak" />}
                    </div>
                    <h3 className="mt-4 text-white text-lg font-semibold">AI Interviewer</h3>
                </div>

                <div className="card w-94 h-72 bg-[#1a1a2e] rounded-xl shadow-md flex flex-col items-center justify-center">
                    <div className="avatar mb-4">
                        <Image
                            src="/user-avatar.png"
                            alt="user avatar"
                            width={120}
                            height={120}
                            className="rounded-full object-cover"
                        />
                    </div>
                    <h3 className="text-white text-lg font-semibold">{userName}</h3>
                </div>
            </div>

            {messages.length > 0 && (
                <div className='transcript-border p-2 max-w-md mx-auto'>
                    <div className='transcript'>
                        <p key={latestMessage} className={cn('transition-opacity duration-500 opacity-0', 'animate-fadeIn opacity-100')}>
                            {latestMessage}
                        </p>
                    </div>
                </div>
            )}

            <div className="w-full flex justify-center">
                {callStatus !== 'ACTIVE' ? (
                    <button className='relative btn-call' onClick={handleCall}>
                        <span className={cn('absolute animate-ping rounded-full opacity-75', callStatus !== 'CONNECTING' && 'hidden')}/>
                        <span>{isCallInactiveOrFinished ? 'Call' : '...'}</span>
                    </button>
                ) : (
                    <button className='btn-disconnect' onClick={handleDisconnect}>
                        End
                    </button>
                )}
            </div>
        </>
    );
};

export default Agent;