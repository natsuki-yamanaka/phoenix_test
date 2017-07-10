Phoenix Paformance Test
====

https://github.com/chrismccord/phoenix_chat_example  
のPhoenixチャットサーバーにコネクションを大量に貼るテストシェル  
そのまま打つと1プロセス100ソケットで5000コネクションまで貼ろうとします  

## Requirement

 * node.js 4.5 or 5.12
 * npm module node-uuid@1.4.8
 * npm module phoenix-js@1.0.3


## Usage

 * 実行  
node ab_test.js

 * 接続先がapp.jsに書いてあるので適宜書き換えてください
