import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { dummyInterviews } from '@/constants'
import InterviewCard from '@/components/InterviewCard'
const Page = () => {
  return (
    <>
      <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
          <h2>Get Interview Ready with AI Powered Practice & Feedback</h2>
          <p className='text-lg'>Practice on real interview questions and get instant feedback</p>
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview" >Start an Interview</Link>
          </Button>
        </div>
        <Image src="/robot.png" alt="robo-dude" width={380} height={380} className='max-sm:hidden' />
      </section>
      <section className='flex flex-col gap-4 '>
        <h2>You Interviews</h2>
        <div className='interviews-section'>
          {dummyInterviews.map((interview)=>(
            <InterviewCard {...interview} key={interview.id}/>
          ))}
          {/* {dummyInterviews.map((interview, index) => (
            <InterviewCard key={`your-${index}`} {...interview} />
          ))} */}
        </div>
      </section >
      <section className='flex flex-col gap-4 '>
        <h2>Take an Interview</h2>
        <div className='interviews-section'>
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id} />
          ))}
          {/* {dummyInterviews.map((interview, index) => (
            <InterviewCard key={`take-${index}`} {...interview} />
          ))} */}
        </div>
      </section>
    </>
  )
}

export default Page
