#include <ESP8266WiFi.h>
#include <PubSubClient.h>

const char* ssid = "SEU_SSID";
const char* password = "SUA_SENHA";
const char* mqtt_server = "35.199.85.54";

WiFiClient espClient;
PubSubClient client(espClient);
long lastMsg = 0;
char msg[50];
int value = 0;

void setup_wifi() {

  delay(10);
  
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

void reconnect() {
  
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
    
      client.subscribe("topic-iot-cefetmg");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      
      delay(3000);
    }
  }
}

void setup() {
  pinMode(BUILTIN_LED, OUTPUT);   
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

float getTemp() {
  float aux = 0;
  int qtd_amostras = 10;
  for(int y=0;y<qtd_amostras;y++)
    aux += (analogRead(A0) * 330.0f) / 1023.0f;
  return aux/qtd_amostras;
}

void loop() {

  if (!client.connected()) {
    reconnect();
  }
  char buff[8];
  float temp = getTemp();
  dtostrf(temp, 6, 2, buff);
  client.loop();
  client.publish("topic-iot-cefetmg/temperatura", buff);
  client.publish("topic-iot-cefetmg/umidade", "84");
  if(temp > 30)
    client.publish("topic-iot-cefetmg/atuador", "1");
  else
    client.publish("topic-iot-cefetmg/atuador", "0");
  delay(30000);
}
