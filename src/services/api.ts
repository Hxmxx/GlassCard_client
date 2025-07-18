import axios from 'axios';

const API_BASE_URL = 'https://cf8c8c7b6e81.ngrok-free.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface CompareResponse {
  success: boolean;
  analysis: {
    semantic_similarity: number;
    pos_matching_score: number;
    synonym_score: number;
    keyword_score: number;
    total_score: number;
    meaning_words: string[];
    user_words: string[];
    meaning_pos_info: Record<string, any>;
    user_pos_info: Record<string, any>;
  };
}

export interface CompareRequest {
  meaning: string;
  user_input: string;
}

export const compareAnswers = async (userInput: string, correctAnswer: string): Promise<CompareResponse> => {
  try {
    const response = await api.post<CompareResponse>('/api/v1/compare', {
      meaning: correctAnswer,
      user_input: userInput
    });
    return response.data;
  } catch (error) {
    console.error('답안 비교 API 오류:', error);
    throw error;
  }
};

export default api;