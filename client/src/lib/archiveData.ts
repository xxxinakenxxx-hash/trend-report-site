// archiveData.ts
// 過去の週次トレンドレポートアーカイブデータ
// 実際の運用では、新しい号を発行するたびにここに追加していく

export interface ArchiveTrendSummary {
  rank: number;
  title: string;
  category: string;
  categoryColor: string;
  totalScore: number;
  icon: string;
  summary: string;
}

export interface ArchiveIssue {
  id: string;           // "2026-04-w4" のようなスラッグ
  issueNumber: string;  // "Vol.01" など
  weekLabel: string;    // "2026年4月第4週"
  publishedAt: string;  // "2026-04-24"
  isLatest: boolean;
  keywordTags: string[];
  topTrends: ArchiveTrendSummary[];
  editorNote: string;   // 編集後記・ひとこと
}

export const archiveIssues: ArchiveIssue[] = [
  // ── 最新号（現在のHome.tsxと同内容のサマリー） ──
  {
    id: '2026-04-w4',
    issueNumber: 'Vol.04',
    weekLabel: '2026年4月第4週',
    publishedAt: '2026-04-24',
    isLatest: true,
    keywordTags: ['抹茶テクスチャー', '新食感', '冷凍ベーカリー', 'クァベギ', 'メロンフェア'],
    editorNote:
      '今週は「食感（テクスチャー）」というキーワードが複数のトレンドを横断していました。味だけでなく、口の中での体験設計が競争軸になっています。',
    topTrends: [
      {
        rank: 1,
        title: '抹茶スイーツの「テクスチャー（とろ生・ぷるとろ）」進化',
        category: 'スイーツ・洋菓子',
        categoryColor: '#10B981',
        totalScore: 24,
        icon: '🍵',
        summary:
          '風味から食感へ。「とろ生」「ぷるとろ」「サクじゅわ」表現がメディアを席巻。動画映えする口どけ設計が鍵。',
      },
      {
        rank: 2,
        title: '「バリむに・プチもち・じゅんわり」複雑な新食感ブーム',
        category: 'パン・ベーカリー',
        categoryColor: '#F5A623',
        totalScore: 23,
        icon: '🍞',
        summary:
          '一口で変化する複雑食感がZ世代に刺さる。ファミマ「超も～っちりパン」が大ヒット中。',
      },
      {
        rank: 3,
        title: '冷凍ベーカリー・スイーツの高付加価値化と省人化対応',
        category: '冷凍食品・冷凍スイーツ',
        categoryColor: '#60A5FA',
        totalScore: 21,
        icon: '❄️',
        summary:
          '人手不足×原材料高騰を背景に、焼成前冷凍生地の需要が急増。2035年市場規模522億ドル予測。',
      },
      {
        rank: 4,
        title: '韓国発「クァベギ（ねじりドーナツ）」の地方波及',
        category: 'パン・ベーカリー',
        categoryColor: '#F5A623',
        totalScore: 20,
        icon: '🍩',
        summary: 'SNS映え×食べ歩きで地方都市にも行列。ブリオッシュ生地のスイーツパンも同時上昇中。',
      },
      {
        rank: 5,
        title: 'メロンスイーツフェアと「コンプリート」消費行動',
        category: 'カフェメニュー',
        categoryColor: '#A78BFA',
        totalScore: 20,
        icon: '🍈',
        summary:
          'スタバ30周年企画が店舗巡り需要を喚起。初夏のメロンフェアは外食各社が一斉展開中。',
      },
    ],
  },

  // ── 第3週号（サンプルデータ） ──
  {
    id: '2026-04-w3',
    issueNumber: 'Vol.03',
    weekLabel: '2026年4月第3週',
    publishedAt: '2026-04-17',
    isLatest: false,
    keywordTags: ['桜スイーツ', 'タピオカ第3波', '高タンパク', 'フルーツサンド', '冷凍フルーツ'],
    editorNote:
      '桜シーズン終盤に向け、「次の季節感」への切り替えタイミングを意識した提案が有効でした。',
    topTrends: [
      {
        rank: 1,
        title: '桜フレーバーの終盤需要と初夏フルーツへの橋渡し',
        category: 'スイーツ・洋菓子',
        categoryColor: '#F472B6',
        totalScore: 22,
        icon: '🌸',
        summary: '桜スイーツの需要が落ち着き始め、いちご・メロン・マンゴーへの移行が始まっている。',
      },
      {
        rank: 2,
        title: 'タピオカ第3波：ドリンク→フード素材への転用',
        category: 'カフェメニュー',
        categoryColor: '#A78BFA',
        totalScore: 21,
        icon: '🧋',
        summary:
          'タピオカをドリンクではなく、パフェ・ケーキ・パンのトッピング素材として活用する動きが拡大。',
      },
      {
        rank: 3,
        title: '高タンパク・低糖質スイーツの主流化',
        category: '健康志向・高付加価値食品',
        categoryColor: '#34D399',
        totalScore: 20,
        icon: '💪',
        summary:
          'プロテイン配合のスイーツがコンビニ・カフェで定番化。「罪悪感なし」訴求が購買を後押し。',
      },
      {
        rank: 4,
        title: 'フルーツサンドの高級化と地方展開',
        category: 'パン・ベーカリー',
        categoryColor: '#F5A623',
        totalScore: 19,
        icon: '🍓',
        summary: '高級生クリーム×旬フルーツのフルーツサンドが地方百貨店でも定番化。原価管理が課題。',
      },
      {
        rank: 5,
        title: '冷凍フルーツ素材の業務用需要拡大',
        category: '冷凍食品・冷凍スイーツ',
        categoryColor: '#60A5FA',
        totalScore: 18,
        icon: '🫐',
        summary: '通年安定供給できる冷凍フルーツへの切り替えが進む。廃棄ロス削減の観点でも注目。',
      },
    ],
  },

  // ── 第2週号（サンプルデータ） ──
  {
    id: '2026-04-w2',
    issueNumber: 'Vol.02',
    weekLabel: '2026年4月第2週',
    publishedAt: '2026-04-10',
    isLatest: false,
    keywordTags: ['発酵パン', 'ピスタチオ', 'クロッフル', '豆乳ラテ', 'グルテンフリー'],
    editorNote:
      '「本物志向」と「健康志向」が同時に動いた週でした。高付加価値素材の提案好機です。',
    topTrends: [
      {
        rank: 1,
        title: 'ピスタチオスイーツの継続上昇と多様化',
        category: 'スイーツ・洋菓子',
        categoryColor: '#10B981',
        totalScore: 23,
        icon: '🟢',
        summary:
          'ピスタチオはクリーム・ペースト・トッピングと用途が多様化。高単価スイーツの主役素材に定着。',
      },
      {
        rank: 2,
        title: 'クロッフル（クロワッサン×ワッフル）の再燃',
        category: 'パン・ベーカリー',
        categoryColor: '#F5A623',
        totalScore: 20,
        icon: '🧇',
        summary: 'ワッフルメーカーで焼くクロワッサン生地がSNSで再注目。冷凍生地との相性が高い。',
      },
      {
        rank: 3,
        title: '豆乳・オーツミルクラテのカフェ定番化',
        category: 'カフェメニュー',
        categoryColor: '#A78BFA',
        totalScore: 20,
        icon: '☕',
        summary: '植物性ミルクの選択肢提供が顧客満足度に直結。業務用植物性ミルクの需要が増加中。',
      },
      {
        rank: 4,
        title: '発酵バター・発酵クリームの高付加価値化',
        category: 'スイーツ・洋菓子',
        categoryColor: '#10B981',
        totalScore: 19,
        icon: '🧈',
        summary: '発酵バターを使ったクロワッサン・スコーンが「本物志向」層に刺さっている。',
      },
      {
        rank: 5,
        title: 'グルテンフリーベーカリーの市場拡大',
        category: '健康志向・高付加価値食品',
        categoryColor: '#34D399',
        totalScore: 17,
        icon: '🌾',
        summary:
          '米粉・アーモンド粉を使ったグルテンフリーパンがアレルギー対応需要で伸長。専門店が増加。',
      },
    ],
  },

  // ── 第1週号（サンプルデータ） ──
  {
    id: '2026-04-w1',
    issueNumber: 'Vol.01',
    weekLabel: '2026年4月第1週',
    publishedAt: '2026-04-03',
    isLatest: false,
    keywordTags: ['新生活需要', 'チョコレート', 'ナン', 'スムージーボウル', '機能性食品'],
    editorNote:
      '新年度スタートで「新生活×ご褒美スイーツ」の購買が活発でした。4月は提案のゴールデンタイムです。',
    topTrends: [
      {
        rank: 1,
        title: '新生活需要×ご褒美スイーツの購買ピーク',
        category: 'スイーツ・洋菓子',
        categoryColor: '#10B981',
        totalScore: 22,
        icon: '🎁',
        summary: '4月の新生活スタートに合わせた「自分へのご褒美」スイーツ需要が急増。ギフト提案が有効。',
      },
      {
        rank: 2,
        title: 'ビーントゥバー・クラフトチョコレートの台頭',
        category: 'スイーツ・洋菓子',
        categoryColor: '#10B981',
        totalScore: 20,
        icon: '🍫',
        summary: '産地・製法にこだわるクラフトチョコが専門店・百貨店で存在感を増している。',
      },
      {
        rank: 3,
        title: 'スムージーボウル・アサイーボウルの定番化',
        category: 'カフェメニュー',
        categoryColor: '#A78BFA',
        totalScore: 19,
        icon: '🥣',
        summary: '朝食・ブランチ需要でスムージーボウルが定番化。冷凍アサイーペーストの業務用需要が拡大。',
      },
      {
        rank: 4,
        title: '機能性表示食品のスイーツ・パンへの応用',
        category: '健康志向・高付加価値食品',
        categoryColor: '#34D399',
        totalScore: 18,
        icon: '🏥',
        summary: '睡眠・腸活・免疫サポートを訴求した機能性スイーツが急増。規制対応の確認が必須。',
      },
      {
        rank: 5,
        title: 'インド料理ブームに乗るナン・チャパティの需要',
        category: 'パン・ベーカリー',
        categoryColor: '#F5A623',
        totalScore: 16,
        icon: '🫓',
        summary: 'インド料理店の増加でナン・チャパティの業務用冷凍生地需要が拡大中。',
      },
    ],
  },

  // ── 3月第4週号（サンプルデータ） ──
  {
    id: '2026-03-w4',
    issueNumber: 'Vol.00',
    weekLabel: '2026年3月第4週',
    publishedAt: '2026-03-27',
    isLatest: false,
    keywordTags: ['桜スイーツ解禁', 'ホワイトデー後', 'イースター', '春の新商品', 'いちご'],
    editorNote:
      '桜シーズン本番前の仕込み時期。いちごとの組み合わせ提案が特に反響を得やすい時期でした。',
    topTrends: [
      {
        rank: 1,
        title: '桜×いちごのダブルフレーバー春スイーツ',
        category: 'スイーツ・洋菓子',
        categoryColor: '#F472B6',
        totalScore: 23,
        icon: '🌸',
        summary: '桜とイチゴを組み合わせた春限定スイーツが各チェーンで一斉展開。ピンク色の視覚訴求が強い。',
      },
      {
        rank: 2,
        title: 'イースターをテーマにしたエッグスイーツ',
        category: 'スイーツ・洋菓子',
        categoryColor: '#10B981',
        totalScore: 19,
        icon: '🥚',
        summary: 'イースター認知の高まりで、卵型チョコ・カラフルマカロンのフェア需要が拡大中。',
      },
      {
        rank: 3,
        title: 'ホワイトデー後の「自分買い」需要の継続',
        category: 'カフェメニュー',
        categoryColor: '#A78BFA',
        totalScore: 18,
        icon: '🍬',
        summary: 'ホワイトデー後も「自分へのご褒美」消費が継続。プチ贅沢スイーツの販売が好調。',
      },
      {
        rank: 4,
        title: 'いちごサンドの多様化（クレープ・大福・パフェ）',
        category: 'パン・ベーカリー',
        categoryColor: '#F5A623',
        totalScore: 18,
        icon: '🍓',
        summary: 'フルーツサンドから派生し、いちごを主役にしたクレープ・大福・パフェが同時展開。',
      },
      {
        rank: 5,
        title: '春の新商品ラッシュと「映え」競争の激化',
        category: 'カフェメニュー',
        categoryColor: '#A78BFA',
        totalScore: 17,
        icon: '📸',
        summary: '各社の春新商品が出揃い、SNS映えの競争が激化。差別化には食感・色・ストーリーが必要。',
      },
    ],
  },
];

// 最新号を取得するユーティリティ
export const getLatestIssue = () => archiveIssues.find((i) => i.isLatest) ?? archiveIssues[0];

// ID からアーカイブ号を取得するユーティリティ
export const getIssueById = (id: string) => archiveIssues.find((i) => i.id === id);
