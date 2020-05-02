# group-goby

「おうちハッカソン」の実装リポジトリ

## 資料系(Google Drive)

https://drive.google.com/drive/folders/1iFnorwXwSU54_lo6njc5q1-zBec_XMX9?usp=sharing

## スキーマ

```js
# roomのスキーマ
{
  "_id": "type: string",
  "name": "type: string",
  "owner": "type: string, $ref:user_id",
  "guest": "type: [] as user",
  "isHire": "type: Boolean, default: true", # メンバーを募集中かのフラグ
  "thema": "type: [] $ref:thema[n].id",
  "isStart": "type: Boolean, default: false", # ゲーム進行中かのフラグ,
  "isCounting": "type: Boolean, default: false", # 結果を集計中かのフラグ,
  "vote": "type: $ref:vote", # ゲーム開始の準備完了時に作成する
}

# userのスキーマ
{
  "_id": "type: string",
  "name": "type: string",
  "thema": "type: string, default: null",
  "isWolf": "type: Boolean, default: false",
}

# voteのスキーマ
[
  { "user_id #投票される": [
    "type: String, $ref:user_id"
  ], },
  { "user_id": [], },
  { "user_id": [], },
]

# themaのスキーマ
[
  {"id": ["ドラえもん", "ポムポムプリン"],},
  {"id": ["ディズニーランド", "サンリオピューロランド"],},
  {"id": ["スイカ", "メロン"],},
  {"id": ["はちみつ", "バター"],},
  {"id": ["vim", "emacs"],},
]

```