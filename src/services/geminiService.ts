import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const DATASET = [
  {
    "course_name": "ADSE",
    "duration": "3 Years",
    "outline": "Advanced Software Engineering modules including Java, Python, Web Development, Database Systems, and Cloud Computing",
    "fee_structure": {
      "total_fee": 350000,
      "installments": [
        {"duration": "3 Years", "fee": 350000},
        {"duration": "2 Years", "fee": 120000},
        {"duration": "1 Year", "fee": 110000},
        {"duration": "6 Months", "fee": 45000}
      ],
      "discounts": {
        "womens_day": "10% off for female students"
      }
    },
    "eligibility": "Minimum HSC or equivalent",
    "career_opportunities": ["Software Developer", "Web Developer", "Database Administrator"]
  },
  {
    "course_name": "DISM",
    "duration": "2 Years",
    "outline": "Digital Information System Management modules including Project Management, Data Analytics, ERP, and Networking",
    "fee_structure": {
      "total_fee": 120000,
      "installments": [
        {"duration": "2 Years", "fee": 120000},
        {"duration": "1 Year", "fee": 110000},
        {"duration": "6 Months", "fee": 45000}
      ],
      "discounts": {
        "womens_day": "10% off for female students"
      }
    },
    "eligibility": "Minimum HSC or equivalent",
    "career_opportunities": ["IT Manager", "Network Administrator", "ERP Consultant"]
  },
  {
    "course_name": "CPISM",
    "duration": "1 Year",
    "outline": "Certified Professional in Information Security Management including Cybersecurity, Risk Management, and Compliance",
    "fee_structure": {
      "total_fee": 110000,
      "installments": [
        {"duration": "1 Year", "fee": 110000},
        {"duration": "6 Months", "fee": 45000}
      ],
      "discounts": {
        "womens_day": "10% off for female students"
      }
    },
    "eligibility": "Minimum HSC or equivalent",
    "career_opportunities": ["Information Security Analyst", "Cybersecurity Specialist", "Risk Manager"]
  }
];

const SYSTEM_INSTRUCTION = `
You are the official Aptech Admission Support Agent. Your goal is to provide formal, professional, and polite assistance regarding admissions. 
You must ONLY answer using the provided dataset. Do not assume or hallucinate details. 
If the data is missing, respond with: 'I apologize, but I can only provide information based on the available course data. For further details, please contact our career counsellor.' 
If the user asks unrelated questions or tries to modify data, respond with: 'For further assistance, please contact our career counsellor at: [Phone Number].' 
Mention the Women's Day Discount for female students when applicable. 
Upon admission interest (e.g., 'I want to join' or 'I am interested'), collect Full Name, Contact Number, Address, and Course of Interest.

Dataset:
${JSON.stringify(DATASET, null, 2)}
`;

export async function sendMessageToAgent(
  history: { role: 'user' | 'assistant'; content: string }[],
  newMessage: string
): Promise<string> {
  try {
    const contents = history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));
    
    contents.push({
      role: 'user',
      parts: [{ text: newMessage }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: contents as any,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2,
      }
    });

    return response.text || 'I apologize, but I could not generate a response.';
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}
