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
  "isHire": "type: Boolean, default: true",
  "thema": "type: [] $ref:thema[n].id",
  "isStart": "type: Boolean, default: false",
}

# userのスキーマ
{
  "_id": "type: string",
  "name": "type: string",
  "thema": "tyoe: string, default: null",
}

# themaのスキーマ
[
  {"id": ["ドラえもん", "ポムポムプリン"],},
  {"id": ["ディズニーランド", "サンリオピューロランド"],},
  {"id": ["スイカ", "メロン"],},
  {"id": ["はちみつ", "バター"],},
  {"id": ["vim", "emacs"],},
]

```