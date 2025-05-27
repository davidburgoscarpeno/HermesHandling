using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

public class ChatHub : Hub
{
    // Historial en memoria (thread-safe)
    private static readonly ConcurrentQueue<ChatMessage> _history = new();

    public async Task SendMessage(UserDto user, string message)
    {
        var chatMessage = new ChatMessage
        {
            User = user,
            Message = message,
            Timestamp = DateTime.UtcNow
        };

        _history.Enqueue(chatMessage);

        // Limita el historial a los últimos 100 mensajes (opcional)
        while (_history.Count > 100)
            _history.TryDequeue(out _);

        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }

    // Método para obtener el historial
    public Task<List<ChatMessage>> GetHistory()
    {
        return Task.FromResult(_history.ToList());
    }
}
