var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

ConfigurationManager config = builder.Configuration;

builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(
        config.GetConnectionString("DEFAULT_CONNECTION_STRING"))
    .UseSnakeCaseNamingConvention()
    .UseLowerCaseNamingConvention()
);

builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = config["Jwt:Issuer"],
            ValidAudience = config["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]))
        };
    });

builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    config["Jwt:Issuer"] = "wavecloud.azurewebsites.net";
    config["Jwt:Audience"] = "wavecloud.azurewebsites.net";
    config["ServiceUrls:StorageUpload"] = "upload-wavecloud.azurewebsites.net";
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UsePathBase("/api");

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");
;

app.Run();