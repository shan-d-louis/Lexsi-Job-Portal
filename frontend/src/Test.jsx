import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Star from "./assets/Star 1.png";

function Test() {
    const [terms, setTerms] = useState(false);
    const [test, setTest] = useState({});
    const [timeLeft, setTimeLeft] = useState(0); // in seconds
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    const params = useParams();
    const navigate = useNavigate();

    // Shuffle array helper
    const shuffleArray = (arr) => {
        const shuffled = [...arr];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    useEffect(() => {
        axios.post(`http://localhost:3007/find-app/${params?.app_id}`)
            .then((res) => {
                var fetchedTest = res.data.data?.testName || ""
                const companyTests = res.data.data?.job_id?.company_id?.tests
                for (var i = 0; i < companyTests.length; i++){
                    if (companyTests[i]?.name == fetchedTest){
                        fetchedTest = companyTests[i]
                        setTest(companyTests[i])
                        break
                    }
                }
                

                if (fetchedTest?.qs) {
                    const modified = fetchedTest.qs.map(q => ({
                        ...q,
                        options: shuffleArray([
                            q.answer,
                            q.wrongOptions1,
                            q.wrongOptions2,
                            q.wrongOptions3
                        ])
                    }));
                    setShuffledQuestions(modified);
                }

                if (fetchedTest?.timeLimit) {
                    
                    setTimeLeft(Number(fetchedTest?.timeLimit) * 60);
                }
        })
        .catch((err) => {console.log("error", err)})
    }, [])

    useEffect(() => {
        if (!terms) return;

        const timer = setInterval(() => {setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        handleSubmit(); 
                        return 0;
                    }
                    return prev - 1;
                })}, 1000);

        return () => {clearInterval(timer)};
    }, [terms]);

    const handleAnswer = (question, answer) => {
        setAnswers(prev => ({ ...prev, [question]: answer }));
    };

    const handleSubmit = () => {
        let score = 0;
        shuffledQuestions.forEach(q => {
            if (answers[q.question] === q.answer) {
                score++;
            }
        });
        const maxScore = shuffledQuestions.length;
        axios.post(`http://localhost:3007/submit-tech-score/${params?.app_id}`, {testScore : `${score}/${maxScore}`})
        navigate(`/test-thankyou/${score}/${maxScore}`);
    };

    console.log("test", test)
    console.log()
    return (
        <>
            {!terms ? (
                <div className='flex flex-col justify-center items-center'>
                    <div className='mt-12'>
                        <span className='font-[Poppins] text-2xl'>Terms & Conditions</span><br/><br/>
                        {/* Terms list */}
                        <ol className="font-[Poppins] list-disc ps-5 flex flex-col space-y-5">
                            <li><strong>Acceptance of Terms:</strong> By accessing and participating in this online assessment, you agree to abide by these Terms and Conditions.</li>
                            <li><strong>Eligibility:</strong> Participants must meet the eligibility criteria specified by the organizer.</li>
                            <li><strong>Assessment Conduct:</strong> Complete the assessment independently. Cheating or misconduct leads to disqualification.</li>
                            <li><strong>Technical Requirements:</strong> Ensure a stable internet connection and compatible device.</li>
                            <li><strong>Time Limits:</strong> Complete the assessment within the allotted time.</li>
                            <li><strong>Data Privacy:</strong> Personal data will be handled in accordance with our Privacy Policy.</li>
                            <li><strong>Intellectual Property:</strong> Assessment content may not be copied or distributed.</li>
                            <li><strong>Results and Evaluation:</strong> Organizer’s decision is final and binding.</li>
                            <li><strong>Disqualification:</strong> Violations may result in disqualification.</li>
                            <li><strong>Modifications:</strong> Terms may be updated at any time.</li>
                        </ol>
                        <br/>
                        <span className='font-[Poppins] font-bold text-red-600'>
                            Note : The Time Starts Once You Press This Button
                        </span><br/>
                        <button 
                            onClick={() => { setTerms(true); }} 
                            className='p-5 font-[Poppins] bg-blue-600 rounded-full text-white cursor-pointer'>
                            Start Test
                        </button>
                    </div>
                </div>
            ) : (
                <div className='flex flex-col space-y-5 mx-auto w-[1200px] rounded-xl p-5 my-5 border border-gray-100'>
                    
                    <div className='flex'>
                        <span className="flex items-center">
                            <img src={Star} className="h-7 w-7" alt="Logo"/>
                            
                            <span className="ms-3 text-2xl font-semibold text-[#384371]">Lexsi</span>
                        </span>
                        {/* Timer */}
                        <span className="text-xl font-bold text-center border-1 border-gray-400 w-[250px] ms-[25vw] py-4 rounded-xl">
                            Time Left : {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
                        </span>
                    </div>

                   {/* Questions */}
                    {shuffledQuestions.map((q, index) => (
                        <div key={index} className='flex flex-col space-y-4 p-5 border rounded-xl'>
                            <span className='font-medium'>{index + 1}) {q.question}</span>
                            <div className='flex justify-between items-center mx-10'>
                                {q.options.map((opt, i) => (
                                    <button key={i} onClick={() => handleAnswer(q.question, opt)} className={`p-5 rounded-full w-[125px] border-1 text-center transition ${answers[q.question] === opt ? 'bg-blue-500 text-white border-blue-600' : 'bg-white text-black border-gray-300 hover:bg-gray-100'}`}>{opt}</button>
                                ))}
                            </div>
                        </div>
                    ))}


                    {/* Submit Button */}
                    <button onClick={(e) => { e.preventDefault(); handleSubmit(); }} className='p-5 w-[150px] font-[Poppins] bg-blue-600 rounded-full font-medium text-white cursor-pointer hover:bg-gradient-to-r from-green-400 via-green-600 to-green-400'>Submit</button>
                </div>
            )}
        </>
    );
}

export default Test;
