#include <Arduino.h>
#include <ESPAsyncWebServer.h>
#include <SPIFFS.h>
const char *ssid = "Nom WiFi";
const char *password = "Mot de passe";
const int valve = 2;
AsyncWebServer server(80);
void setup()
{
  //----------------------------------------------------Serial
  Serial.begin(115200);
  Serial.println("\n");
  //----------------------------------------------------GPIO
  pinMode(valve, OUTPUT);
  digitalWrite(valve, LOW);
  //----------------------------------------------------SPIFFS
  if(!SPIFFS.begin())
  {
    Serial.println("Erreur SPIFFS...");
    return;
  }
  File root = SPIFFS.open("/");
  File file = root.openNextFile();
  while(file)
  {
    Serial.print("File: ");
    Serial.println(file.name());
    file.close();
    file = root.openNextFile();
  }
  //----------------------------------------------------WIFI
  WiFi.begin(ssid, password);
	Serial.print("Tentative de connexion...");
	while(WiFi.status() != WL_CONNECTED)
	{
		Serial.print(".");
		delay(100);
	}
	Serial.println("\n");
	Serial.println("Connexion etablie!");
	Serial.print("Adresse IP: ");
	Serial.println(WiFi.localIP());
  //----------------------------------------------------SERVER
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request)
  {
    request->send(SPIFFS, "/index.html", "text/html");
  });
  server.on("/w3.css", HTTP_GET, [](AsyncWebServerRequest *request)
  {
    request->send(SPIFFS, "/w3.css", "text/css");
  });
  server.on("/script.js", HTTP_GET, [](AsyncWebServerRequest *request)
  {
    request->send(SPIFFS, "/script.js", "text/javascript");
  });
  server.on("/on", HTTP_GET, [](AsyncWebServerRequest *request)
  {
    digitalWrite(valve, HIGH);
    request->send(200);
  });
  server.on("/off", HTTP_GET, [](AsyncWebServerRequest *request)
  {
    digitalWrite(valve, LOW);
    request->send(200);
  });
  server.begin();
  Serial.println("Serveur actif!");
}
void loop()
{
}