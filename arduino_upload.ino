#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 10   // SDA/SS pin of RC522
#define RST_PIN 9   // RST pin of RC522

#define BUZZER_PIN 7
#define LED_GREEN 6
#define LED_RED 5

MFRC522 mfrc522(SS_PIN, RST_PIN); // Create MFRC522 instance

void setup() {
  Serial.begin(9600);
  SPI.begin();
  mfrc522.PCD_Init();

  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(LED_GREEN, OUTPUT);
  pinMode(LED_RED, OUTPUT);

  digitalWrite(BUZZER_PIN, LOW);
  digitalWrite(LED_GREEN, LOW);
  digitalWrite(LED_RED, LOW);

  Serial.println("\nRFID Reader ready. Tap a card...");
}

void loop() {
  // Look for new cards
  if (!mfrc522.PICC_IsNewCardPresent()) return;
  if (!mfrc522.PICC_ReadCardSerial()) return;

  // Print UID
  Serial.print("Card UID: ");
  String uid = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
    Serial.print(mfrc522.uid.uidByte[i], HEX);
    uid += String(mfrc522.uid.uidByte[i], HEX);
  }
  Serial.println();

  // Simple feedback logic
  if (uid == "4b8a1f23") { // Example card UID, replace with your own
    successFeedback();
  } else {
    failFeedback();
  }

  delay(1000); // Small delay to avoid rapid retrigger
}

void successFeedback() {
  Serial.println("Payment Successful ✅");
  digitalWrite(LED_GREEN, HIGH);
  tone(BUZZER_PIN, 1000, 200);
  delay(300);
  digitalWrite(LED_GREEN, LOW);
}

void failFeedback() {
  Serial.println("Payment Failed ❌");
  digitalWrite(LED_RED, HIGH);
  tone(BUZZER_PIN, 200, 400);
  delay(500);
  digitalWrite(LED_RED, LOW);
}
