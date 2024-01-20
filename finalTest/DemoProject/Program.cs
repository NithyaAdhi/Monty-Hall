var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(opetion => opetion.AddPolicy(name: "MontyHallorigin",
     policy =>
     {
         policy.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
     }
    ));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseCors("MontyHallorigin");
app.UseRouting();


app.UseAuthorization();

app.MapControllers();

app.Run();
