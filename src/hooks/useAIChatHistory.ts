import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import aiService from '@/services/ai.service';
import { AIHistoryItem } from '@/types';

export function useAIChatHistory() {
  return useQuery({
    queryKey: ['ai-chat-history'],
    queryFn: () => aiService.getChatHistory() as Promise<AIHistoryItem[]>,
    staleTime: 1000 * 60 * 5,
  });
}

export function useDeleteChatHistory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (historyId: string) => aiService.deleteChatHistory(historyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-chat-history'] });
    },
  });
}

export function useClearAllChatHistory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => aiService.clearAllChatHistory(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-chat-history'] });
    },
  });
}

export function useSendChatMessage() {
  return useMutation({
    mutationFn: (payload: { conversationId: string | null; message: string }) =>
      aiService.sendChatMessage(payload.conversationId, payload.message),
  });
}
