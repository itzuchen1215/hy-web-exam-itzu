# hy-web-exam
使用框架與套件:
- Vue3 + vite
- video.js
- vant4
---
待修正:

1. (不影響功能) 在 mobile device 下拖曳 SeekBar, video.js 會噴 error
    ```
    Unable to preventDefault inside passive event listener invocation.
    ```
---
## 其他加分題目
> Q. 如果影片想要設計試看功能，請問怎麼設計比較好。
舉例 一個影片長30mins，但試看只能看前5mins
> 1. 影片來源需是 m3u8 格式
> 2. 設計想法 並不侷限在前端操作行為，可自由發揮

### Solution 
- 前提: 
    - 使用加密的 m3u8 格式影片
    - 前端利用 API 判斷使用者是否有權限能夠看到完整的影片
    - 如果試看功能的詳細設定可由後台設定，可考慮由 API 回傳試看資訊(例如可以看到幾分幾秒)

- Solution A. 後端開放帶參數讓 API 只回傳試看長度的影片, 或是有特定的 API 可以取得試看影片
    - API需對參數做驗證, 只能取得一定時間長度內的試看影片
    - 試看結束後利用跳窗或導頁引導使用者付費或註冊

- Solution B. 利用前端設計讓原本的影片播放到固定的秒數後就暫停撥放
    - 前端需要針對試看功能對撥放器做一些特例的調整
    - 試看結束後利用跳窗或導頁引導使用者付費或註冊