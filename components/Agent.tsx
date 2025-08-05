// import React from 'react'
// import Image from 'next/image'
// const Agent = ({ userName }: AgentProps) => {
//     const isSpeaking = true;
//     return (
//         <>
//             <div className='call-view'>
//                 <div className="card-interviewer">
//                     <div className="avatar">
//                         <Image src="/ai-avatar.png" alt="vapi" width={65} height={54} className="object-cover" />
//                         {isSpeaking && <span className='animate-speak' />}
//                     </div>
//                     <h3>AI Interviewer</h3>
//                 </div>
//                 <div className="card-border">
//                     <div className="card-content">
//                         <Image src="/user-avatar.png" alt="user avatar" width={540} height={540} className=" rounded-full sixe-[120px] object-cover" />
//                         <h3>{userName}</h3>
//                     </div>
//                 </div>

//             </div>
//         </>
//     )
// }

// export default Agent

import { cn } from '@/lib/utils';
import Image from 'next/image'
enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}


const Agent = ({ userName }: AgentProps) => {
    const isSpeaking = true
    const callStatus = CallStatus.FINISHED;
    const messages=[
        'What is your name?',
        'My name is John Doe,nice to meet you.'
    ];
    const lastMessage=messages[messages.length-1]

    return (
        <>
            <div className="call-view flex items-center justify-center gap-10 flex-wrap p-4">
                {/* Interviewer Card */}
                <div className="card w-94 h-72 bg-[#1a1a2e] rounded-xl shadow-md flex flex-col items-center justify-center relative">
                    <div className="avatar relative">
                        <Image src="/ai-avatar.png" alt="AI Interviewer" width={80} height={80} className="object-cover rounded-full" />
                        {isSpeaking && <span className="animate-speak " />}
                    </div>
                    <h3 className="mt-4 text-white text-lg font-semibold">AI Interviewer</h3>
                </div>

                {/* User Card */}
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

            {messages.length>0 && (
                <div className='transcript-border p-2 max-w-md mx-auto'>
                    <div className='transcript'>
                        <p key={lastMessage} className={cn('transition-opacity duration-500 opacity-0','animate-fadeIn opacity-100')}>
                            {lastMessage}
                        </p>
                    </div>
                </div>
            )}
            <div className="w-full flex justify-center">
                {callStatus !== 'ACTIVE' ? (
                    <button className='relative btn-call'>
                        <span className={cn('absolute animate-ping rounded-full opacity-75 ', callStatus !== 'CONNECTING' && 'hidden')}
                        />
                        <span>
                            {callStatus === 'INACTIVE' || callStatus === 'FINISHED' ? 'Call' : '...'}
                        </span>
                    </button>
                ) : (
                    <button className='btn-disconnect'>
                        End
                    </button>
                )}
            </div>
        </>
    )
}

export default Agent

