// import React from 'react'
// import { getRandomInterviewCover } from '@/lib/utils';
// import dayjs from 'dayjs';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Button } from './ui/button';
// import DisplayTechIcons from './DisplayTechIcons';
// import { getFeedbackByInterviewId } from '@/lib/actions/general.action';
// const InterviewCard = async({ id, userId, role, type, techstack, createdAt }: InterviewCardProps) => {
//   const feedback = userId && id
//   ? await getFeedbackByInterviewId({interviewId:id,userId}):null
//   const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
//   const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('MMM D,YYYY')
//   return (
//     <div className='card-border w-[360px] max-sm:w-full min-h-96'>
//       <div className='card-interview'>
//         <div>
//           <div className='absolute top-0 w-fit right-0 px-4 py-2 rounded-bl-lg bg-light-600'>
//             <p className='badge-text'>{normalizedType}</p>
//           </div>
//           <Image src={getRandomInterviewCover()} alt="cover image" width={90} height={90} className='rounded-full object-fit size-[90px]' />
//           <h3 className='mt-5 capitalize'>
//             {role} Interview
//           </h3>
//           <div className="flex flex-row gap-5 mt-3">
//             <div className='flex flex-row gap-2'>
//               <Image src="/calendar.svg" alt="calendar" height={22} width={22} />
//               <p>{formattedDate}</p>
//             </div>
//             <div className="flex flex-row gap-2 items-center">
//               <Image src="/star.svg" alt="star" height={22} width={22} />
//               <p>{feedback?.totalScore || "---"}/100</p>
//             </div>
//           </div>
//           <p className='line-clamp-2 mt-5'>{feedback?.finalAssessment || "You haven't taken the interview yet.Take it now to improve your skills."}</p>
//         </div>
//         <div className='flex flex-row justify-between'>
//           <DisplayTechIcons techStack={techstack}/>
//           <Button className="btn-primary">
//             <Link href={feedback
//               ?`/interview/${id}/feedback`
//               :`/interview/${id}`}>
//               {feedback?'Check Feedback' : 'View Interview'}
//             </Link>
//           </Button>
//         </div>
//       </div>
      
//     </div>
//   )
// }

// export default InterviewCard


import { getRandomInterviewCover } from '@/lib/utils';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import DisplayTechIcons from './DisplayTechIcons';
import { getFeedbackByInterviewId } from '@/lib/actions/general.action';

interface InterviewCardProps {
  id: string;
  userId: string;
  currentUserId: string; // Add this prop
  role: string;
  type: string;
  techstack: string[];
  createdAt?: string;
}

const InterviewCard = async ({ 
  id, 
  userId, 
  currentUserId,
  role, 
  type, 
  techstack, 
  createdAt 
}: InterviewCardProps) => {
  // Only fetch feedback if it's the current user's interview
  const feedback = userId === currentUserId && id
    ? await getFeedbackByInterviewId({interviewId: id, userId})
    : null;

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formattedDate = dayjs(createdAt || Date.now()).format('MMM D,YYYY');
  
  return (
    <div className='card-border w-[360px] max-sm:w-full min-h-96'>
      <div className='card-interview'>
        <div>
          <div className='absolute top-0 w-fit right-0 px-4 py-2 rounded-bl-lg bg-light-600'>
            <p className='badge-text'>{normalizedType}</p>
          </div>
          <Image src={getRandomInterviewCover()} alt="cover image" width={90} height={90} className='rounded-full object-fit size-[90px]' />
          <h3 className='mt-5 capitalize'>
            {role} Interview
          </h3>
          <div className="flex flex-row gap-5 mt-3">
            <div className='flex flex-row gap-2'>
              <Image src="/calendar.svg" alt="calendar" height={22} width={22} />
              <p>{formattedDate}</p>
            </div>
            {/* Only show score if it's the current user's interview */}
            {userId === currentUserId && (
              <div className="flex flex-row gap-2 items-center">
                <Image src="/star.svg" alt="star" height={22} width={22} />
                <p>{feedback?.totalScore || "---"}/100</p>
              </div>
            )}
          </div>
          <p className='line-clamp-2 mt-5'>
            {userId === currentUserId 
              ? (feedback?.finalAssessment || "You haven't taken the interview yet. Take it now to improve your skills.")
              : "Complete this interview to see your feedback"}
          </p>
        </div>
        <div className='flex flex-row justify-between'>
          <DisplayTechIcons techStack={techstack}/>
          <Button className="btn-primary">
            <Link href={userId === currentUserId && feedback
              ? `/interview/${id}/feedback`
              : `/interview/${id}`}>
              {userId === currentUserId && feedback ? 'Check Feedback' : 'View Interview'}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default InterviewCard;