namespace desafio_full.Services
{
    public class ServiceResponse<T>
    {
        public T Data { get; set; }
        public bool Success { get; set; } = true;
        public string Message { get; set; } = null;

        public ServiceResponse() { }
        public ServiceResponse(string message) : this(default(T), false, message) { }
        public ServiceResponse(T data) : this(data, true, null) { }
        public ServiceResponse(T data, bool success, string message)
        {
            Data = data;
            Success = success;
            Message = message;
        }
    }
}
