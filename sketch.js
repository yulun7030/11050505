// ==========================================
    // 狗狗繪製：精確眨眼 + 痛苦表情 / 自然開心微笑表情
    // ==========================================
    function drawInjuredDogSprite(withWoundsAndBranches, isPain = false, isHappy = false) {
      let w = INJURED_DOG_WIDTH;
      let h = INJURED_DOG_HEIGHT;

      let breath = sin(frameCount * (isHappy ? 0.08 : 0.045));
      let scaleW = map(breath, -1, 1, 0.99, 1.01);
      let scaleH = map(breath, -1, 1, 1.01, 0.99);
      let floatY = breath * (isHappy ? 2.5 : 1.8);

      push();
      translate(0, floatY);
      scale(scaleW, scaleH);

      let leftEyeX = 38;
      let leftEyeY = -10;
      let rightEyeX = 88;
      let rightEyeY = -18;

      if (dogLoaded && dogImg && dogImg.width > 0) {
        image(dogImg, 0, 0, w, h);
      } else {
        drawFallbackDog(w, h);
      }

      // 【表情 1】：治療完成後 -> 自然開心的笑瞇瞇月牙眼（修復黑斑問題）
      if (isHappy) {
        push();
        // 1. 精準覆蓋原圖的眼球與眼角淚水（取狗狗臉部毛皮主色調）
        noStroke();
        fill(90, 49, 25); // #5A3119 原圖眼窩皮毛同色
        // 左眼與下方淚囊覆蓋
        ellipse(leftEyeX - 1, leftEyeY + 3, 30, 26);
        ellipse(leftEyeX - 6, leftEyeY + 12, 16, 16);
        // 右眼與眼角淚囊覆蓋
        ellipse(rightEyeX - 1, rightEyeY + 2, 28, 24);
        ellipse(rightEyeX - 4, rightEyeY + 10, 15, 15);

        // 2. 靈動幸福月牙微笑笑眼 (亮黑深褐色流暢弧線)
        noFill();
        stroke(45, 23, 12);
        strokeWeight(3.5);
        strokeCap(ROUND);
        // 左眼月牙弧（微笑向上揚起）
        arc(leftEyeX - 2, leftEyeY + 2, 24, 15, 0.15 * PI, 0.85 * PI);
        // 右眼月牙弧
        arc(rightEyeX - 1, rightEyeY + 2, 22, 14, 0.15 * PI, 0.85 * PI);

        // 3. 微笑上揚睫毛小細節
        line(leftEyeX + 9, leftEyeY + 7, leftEyeX + 13, leftEyeY + 4);
        line(rightEyeX + 9, rightEyeY + 7, rightEyeX + 13, rightEyeY + 4);

        // 4. 開心放鬆的眉毛
        stroke(65, 33, 16);
        strokeWeight(2.5);
        arc(leftEyeX - 2, leftEyeY - 14, 18, 8, 1.1 * PI, 1.9 * PI);
        arc(rightEyeX - 1, rightEyeY - 14, 16, 8, 1.1 * PI, 1.9 * PI);

        // 5. 兩頰粉嫩微腮紅
        noStroke();
        fill(251, 113, 133, 120);
        ellipse(leftEyeX - 22, leftEyeY + 18, 16, 9);
        ellipse(rightEyeX + 18, rightEyeY + 16, 16, 9);
        pop();
      }
      // 【表情 2】：治療痛感中 -> 閉眼皺眉噴淚
      else if (isPain) {
        noStroke();
        fill(PALETTE.dogEyelid);
        ellipse(leftEyeX, leftEyeY, 32, 30);
        ellipse(rightEyeX, rightEyeY, 30, 28);

        stroke(PALETTE.dogEyeDark);
        strokeWeight(4);
        noFill();
        line(leftEyeX - 12, leftEyeY - 6, leftEyeX + 6, leftEyeY);
        line(leftEyeX - 12, leftEyeY + 8, leftEyeX + 6, leftEyeY);
        line(rightEyeX + 12, rightEyeY - 6, rightEyeX - 6, rightEyeY);
        line(rightEyeX + 12, rightEyeY + 8, rightEyeX - 6, rightEyeY);

        fill(186, 230, 253, 230);
        noStroke();
        circle(leftEyeX - 18, leftEyeY + 12, 10);
        circle(leftEyeX - 26, leftEyeY + 22, 7);
        circle(rightEyeX + 18, rightEyeY + 12, 10);
        circle(rightEyeX + 26, rightEyeY + 22, 7);
      }
      // 【表情 3】：日常受傷流淚狀態
      else {
        let blinkTimer = frameCount % 190;
        let isBlinking = blinkTimer > 165 && blinkTimer < 180;

        if (isBlinking) {
          noStroke();
          fill(PALETTE.dogEyelid);
          ellipse(leftEyeX, leftEyeY, 28, 26);
          ellipse(rightEyeX, rightEyeY, 27, 25);

          noFill();
          stroke(PALETTE.dogEyeDark);
          strokeWeight(3.0);
          arc(leftEyeX, leftEyeY + 1, 24, 13, PI * 0.08, PI * 0.92);
          arc(rightEyeX, rightEyeY + 1, 23, 13, PI * 0.08, PI * 0.92);
        } else {
          let tearShine = sin(frameCount * 0.12) * 1.5;
          noStroke();
          fill(PALETTE.tearBlue);
          ellipse(leftEyeX - 6, leftEyeY + 6, 7 + tearShine, 8 + tearShine);
          ellipse(rightEyeX - 6, rightEyeY + 6, 7 + tearShine, 8 + tearShine);

          fill(255, 255, 255, 230);
          circle(leftEyeX - 8, leftEyeY + 4, 3.2);
          circle(rightEyeX - 8, rightEyeY + 4, 3.2);
        }

        let tearProgress = (frameCount % 160) / 160;
        let tearY1 = map(tearProgress, 0, 1, leftEyeY + 6, leftEyeY + 42);
        let tearY2 = map((tearProgress + 0.3) % 1, 0, 1, rightEyeY + 6, rightEyeY + 38);
        let tearAlpha = map(tearProgress, 0, 0.8, 230, 0);

        fill(186, 230, 253, tearAlpha);
        noStroke();
        ellipse(leftEyeX - 5, tearY1, 4.5, 7.5);
        fill(186, 230, 253, map((tearProgress + 0.3) % 1, 0, 0.8, 230, 0));
        ellipse(rightEyeX - 5, tearY2, 4.2, 7.0);
      }

      if (withWoundsAndBranches) {
        drawWoundsOnlyOnDog();
      }

      pop();
    }
    // 遊戲狀態控制
let gameState = "DRESS_UP"; // 當前在換裝關卡

// 國小生友善的動保宣導金句（可隨機抽或循序顯示）
const sloganList = [
  "謝謝你幫我打扮！領養不棄養，愛我就要照顧我一輩子喔！汪！",
  "每一隻毛孩都是家人！出門散步記得繫牽繩，保護我也保護別人喔！",
  "看到流浪毛孩受傷時，記得請大人幫忙通報救援，謝謝你愛護動物！"
];

let finalSlogan = "";

// 模擬裝扮確認按鈕區域 (x, y, w, h)
const okButton = { x: 300, y: 350, w: 100, h: 45 };
function mousePressed() {
  if (gameState === "DRESS_UP") {
    // 檢查是否點擊了 OK 按鈕
    if (
      mouseX >= okButton.x &&
      mouseX <= okButton.x + okButton.w &&
      mouseY >= okButton.y &&
      mouseY <= okButton.y + okButton.h
    ) {
      // 隨機選一句動保宣導語
      finalSlogan = random(sloganList);
      
      // 直接結束換裝，進入遊戲結束/結尾畫面（不再重複打開衣櫃）
      gameState = "FINALE";
    }
  } else if (gameState === "FINALE") {
    // 如果玩家點擊畫面任意處，可提供重新開始或返回選單
    // restartGame();
  }
}
function draw() {
  background(240);

  if (gameState === "DRESS_UP") {
    // 1. 繪製狗狗與穿戴好的帽子
    drawDogWithHat();

    // 2. 繪製 OK 按鈕
    fill(76, 175, 80); // 活潑的草綠色
    rect(okButton.x, okButton.y, okButton.w, okButton.h, 10);
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("OK 完成", okButton.x + okButton.w / 2, okButton.y + okButton.h / 2);

  } else if (gameState === "FINALE") {
    // 結尾關卡：狗狗展示 + 宣傳對話框
    drawDogWithHat();
    drawSpeechBubble(finalSlogan);
    drawGameOverBanner();
  }
}

// 繪製對話泡泡與宣傳語
function drawSpeechBubble(message) {
  push();
  // 對話框背景
  fill(255);
  stroke(100);
  strokeWeight(3);
  rectMode(CENTER);
  rect(width / 2, 140, 480, 100, 15);

  // 對話框小箭頭（指向狗狗）
  noStroke();
  fill(255);
  triangle(width / 2 - 20, 190, width / 2 + 20, 190, width / 2, 215);
  stroke(100);
  line(width / 2 - 20, 190, width / 2, 215);
  line(width / 2 + 20, 190, width / 2, 215);

  // 文字內容（適合國小生閱讀的排版）
  fill(50);
  noStroke();
  textSize(16);
  textAlign(CENTER, CENTER);
  textLeading(24);
  text(message, width / 2, 140, 440, 80);
  pop();
}

// 結束通關提示
function drawGameOverBanner() {
  push();
  fill(255, 152, 0);
  textSize(28);
  textAlign(CENTER, CENTER);
  text("★ 救援任務大成功！★", width / 2, 50);

  fill(120);
  textSize(14);
  text("點擊畫面任意處重新開始", width / 2, height - 30);
  pop();
}