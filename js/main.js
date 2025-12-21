//메인

const pluginViewButtons = document.querySelectorAll('.plugin button');
const sections = document.querySelectorAll('.content-section');

pluginViewButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.dataset.target;

        // 상단 버튼 active
        pluginViewButtons.forEach(b => b.classList.remove('active'));
        button.classList.add('active');

        activateSection(targetId);
    });
});

//섹션 활성화 + sub-nav 이동 + 초기화
const subNav = document.querySelector('.sub-nav');
const subButtons = subNav.querySelectorAll('button');

function activateSection(id) {
    sections.forEach(sec => {
        sec.classList.toggle('active', sec.id === id);
    });

    attachSubNavToActiveSection();
    resetSubNav();
}

function attachSubNavToActiveSection() {
    const activeSection = document.querySelector('.content-section.active');
    if (!activeSection) return;

    const h2 = activeSection.querySelector('h2');
    h2.after(subNav);
}

//서브 탭 전환 (공용, 단 1번)
subButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const key = btn.dataset.sub;
        const section = document.querySelector('.content-section.active');
        if (!section) return;

        // 버튼 active
        subButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // 콘텐츠 전환
        section.querySelectorAll('.sub-section').forEach(sub => {
            sub.classList.toggle(
                'active',
                sub.dataset.sub === key
            );
        });
    });
});

//섹션 전환 시 서브탭 초기화
function resetSubNav() {
    subButtons.forEach((b, i) => {
        b.classList.toggle('active', i === 0);
    });

    const section = document.querySelector('.content-section.active');
    if (!section) return;

    section.querySelectorAll('.sub-section').forEach((sub, i) => {
        sub.classList.toggle('active', i === 0);
    });
}

activateSection(
    document.querySelector('.content-section.active')?.id
);

const subName = {
    ko: {
        quick: "소개",
        params: "파라미터",
        faq: "자주 묻는 질문"
    },
    en: {
        quick: "Introduction",
        params: "Parameters",
        faq: "FAQ"
    },
    ja: {
        quick: "紹介",
        params: "パラメータ",
        faq: "よくある質問"
    }
};


function updateSubNavLanguage(lang) {
    document.querySelectorAll('.sub-nav button').forEach(btn => {
        const key = btn.dataset.sub;
        btn.textContent = subName[lang][key];
    });
}
const languageSelect = document.getElementById('language');

// 초기 로드 (기본 한국어)
updateSubNavLanguage(languageSelect.value);


// 언어 변경 시
languageSelect.addEventListener('change', (e) => {
    updateSubNavLanguage(e.target.value);
});

const commonParamsText = {
    ko: `<div class="param-note">설명이 필요할 수 있는 일부 파라미터를 소개합니다.
    플러그인을 켜고 설명과 함께 직접 다뤄보면서 이해하시길 권장드립니다.
<small>(직관적인 Color, Size 등의 파라미터는 편의상 생략합니다.)</small></div>`,

    ja: `<div class="param-note">説明が必要なパラメータを紹介します。
プラグインを起動し、説明と一緒に実際に操作して理解することをお勧めします。
<small>(直感的なColorやSizeなどのパラメータは便宜上省略しています。)</small></div>`,

    en: `<div class="param-note">Introducing parameters that may require explanation.
We recommend opening the plugin and exploring them alongside this guide for better understanding.
<small>(Intuitive parameters such as Color or Size are omitted for convenience.)</small></div>`,
};


const updateText = {
    ko: `업데이트 준비중`,

    ja: `更新準備中`,

    en: `Update in progress`,

};

const smartStrokeLog = {
    ko: {
        quick: `레이어의 알파 값에 반응하는 **스마트한 선 효과**입니다.
얇은 선의 경우에는 **레이어스타일 - 선**과 비교해도 성능 차이가 거의 없습니다.
하지만 선이 굵어질수록(100px) 모든 픽셀의 알파 값을 참조하는 과정에서 상대적으로 성능을 요구합니다.
[[video:assets/smart stroke/videos/적용]]
**알파 값**을 **참조** 한다는게 무슨 말인가요?
[[video:assets/smart stroke/videos/블러]]
기본적인 선 효과는 이분법적으로 외곽선을 처리하기 때문에, 블러(모션 블러)나 불투명도 적용 시 매끄러운 느낌이 나지 않습니다.
또한, 포토샵처럼 두 개 이상의 선을 손쉽게 추가할 수 있습니다.
`,
        params: commonParamsText.ko + `

**Source Opacity** 효과 적용 전 레이어의 불투명도입니다. [[sub-video 25:assets/smart stroke/videos/Source Opacity]]

**Round Corner** 선의 코너를 둥글게 처리할지 결정합니다. [[sub-image 25:assets/smart stroke/images/Source Opacity ON]] [[sub-image 25:assets/smart stroke/images/Source Opacity OFF]]

`,
        faq:  updateText.ko + ``
    },
    ja: {
        quick: `レイヤーのアルファ値に反応する**スマートな線の効果**です。
細い線の場合、**レイヤースタイル - 線**と比較してもパフォーマンスの差はほとんどありません。
しかし、線が太くなるほど(100px)全てのピクセルのアルファ値を参照するため、相対的にパフォーマンスを要求します。
[[video:assets/smart stroke/videos/적용]]
**アルファ値**を**参照**するとはどういう意味ですか？
[[video:assets/smart stroke/videos/블러]]
基本的な線の効果は二分法的にアウトラインを処理するため、ブラー（モーションブラー）や不透明度を適用すると滑らかさに欠けます。
また、Photoshopのように複数の線を簡単に追加することができます。
`,
        params: commonParamsText.ja + `

**Source Opacity** 効果適用前のレイヤーの不透明度です。 [[sub-video 25:assets/smart stroke/videos/Source Opacity]]

**Round Corner** 線の角を丸くするかどうかを決定します。 [[sub-image 25:assets/smart stroke/images/Source Opacity ON]] [[sub-image 25:assets/smart stroke/images/Source Opacity OFF]]

`,
        faq:  updateText.ja + ``
    },
    en: {
        quick: `This is a **smart stroke effect** that responds to the alpha value of the layer.
For thin strokes, the performance difference compared to **Layer Style - Stroke** is negligible.
However, as the stroke gets thicker (100px), referencing the alpha of every pixel requires relatively more performance.
[[video:assets/smart stroke/videos/적용]]
What does it mean to **reference the alpha value**?
[[video:assets/smart stroke/videos/블러]]
Basic stroke effects process outlines in a binary manner, so applying blur (motion blur) or opacity does not result in smooth visuals.
Also, you can easily add multiple strokes, just like in Photoshop.
`,
        params: commonParamsText.en + `

**Source Opacity** The opacity of the layer before applying the effect. [[sub-video 25:assets/smart stroke/videos/Source Opacity]]

**Round Corner** Determines whether to round the corners of the stroke. [[sub-image 25:assets/smart stroke/images/Source Opacity ON]] [[sub-image 25:assets/smart stroke/images/Source Opacity OFF]]

`,
        faq: updateText.en + ``
    }
};



const pathRepeaterLog = {
    ko: {
        quick: `무작위에 의존하던 파티클에서 벗어나, 패스를 따라 설계된 반복 모션을 구현합니다.
패스를 바꾸는 순간 결과는 즉시 반응하며, 200개 이상의 파라미터가 유기적으로 작동해 창의적인 상상력을 확장합니다.
이름과는 다르지만 Grid, Circle, Spiral 등 기본 반복 패턴을 제공해, 별도의 패스 없이도 즉시 작업을 시작할 수 있습니다.
[[video:assets/path repeater/videos/구름]]
[[video:assets/path repeater/videos/4분할]]
`,
        params: commonParamsText.ko + `
[[toggle-image 파라미터 보기:assets/path repeater/images/파라미터]]
<topic "Repeater Mode">
**반복되는 모드를 설정합니다.**
[[video:assets/path repeater/videos/Repeater Mode]]
<topic open "Path">
마스크 패스를 지정하거나 텍스트 레이어를 지정 할 수 있습니다.
**All Path** 레이어에 적용된 모든 마스크를 적용합니다.
**Edge & Vertex** 두가지 모드가 존재합니다. 
<topic "Vertex">
**Bezier Scale** 패스의 베지어 핸들이 거리에 비례하여 크기가 조절됩니다.
**Scale Per Distance** 거리에 비례하는 스케일의 기준을 설정합니다.
**Bezier Rotation** 패스의 베지어 방향에 따라 회전이 적용됩니다.
[[video:assets/path repeater/videos/Vertex]]
</topic>
<topic open "Edge">
**Copies** 패스에 복제할 개수입니다. 소수점을 지원하며 소수점은 ***Interpolation*** 에 영향을 받습니다.
**Interval** 복제할 간격을 선택합니다. 패스의 전체 길이를 기준으로 간격마다 배치합니다.
**Radnom Interval** 간격에 랜덤 값을 추가합니다. 값이 클수록 불규칙한 간격으로 배치할 수 있습니다.
**Offset** 패스 방향에 맞게 복제를 이동 시킵니다.
**Offset Loop** 오프셋으로 패스를 이동시킬 때, 패스의 시작과 끝이 연결되어 반복됩니다.
**Loop Radnom Seed** ***Offset Loop*** 인해서 ***loop***가 발생할때 마다 ***Radnom*** 값의 시드가 변경됩니다.
[[video:assets/path repeater/videos/Loop Radnom Seed]]
위 OFF 아래 ON 예시입니다. 루프가 발생할때 마다 위쪽은 반복되는 느낌이 드는걸 확인 할 수 있습니다.
</topic>
</topic>
</topic> 
**Index Reverse** 인덱스를 반전합니다. 인덱스는 그리기 순서(Z축이 동일할때)및 인덱스 관련 효과에 영향을 줍니다.
<topic "Repeater Transform">
패스자체에 3D 변형을 적용하는 옵션이라고 생각하시면 편합니다.
**Controller Layer**는 지정된 레이어의 변형을 가져와서 적용합니다.
[[video:assets/path repeater/videos/Cotroller Layer]]
***Mask Path***를 표현식을 통해 ***Shape Layer***의 패스로 만들고 그 모양 레이어를 ***Controller Layer***에로 선택한 모습입니다.
*3D 축 변형을 수행하는 경우에는 Camera - AE Camera로 설정한다음에 카메라 레이어를 만들어야지 완벽하게 일치합니다.*
</topic>
<topic "Texture">
복제될 레이어를 선택합니다. **Texture Layer** 와 **Text Layers** 두가지의 방식이 있습니다.
**Texture Layer**는 단일 텍스쳐 레이어를 위한 모드 입니다.
**Texture Layers**는 커스텀 파라미터로 동작하는 멀티 텍스쳐 레이어를 위한 모드 입니다.
<topic "Text Layers">
<topic "Textures Mode는 멀티 텍스쳐중 무슨 텍스쳐를 쓸지에 대한 규칙입니다.">
**Distance** 거리기반으로 변경됩니다. 패스의 거리에서 가장 가까운 거리의 텍스쳐를 선택합니다.
**Distance F** ***F***가 붙은 파라미터는 패스의 ***Offset*** 기능에 영향을 받지 않는다는 것을 뜻합니다.
**Random** 랜덤으로 텍스쳐를 선택합니다. 무작위 위치에서 하나의 텍스쳐를 가져오는 원리입니다.
**Check** 체크무늬패턴으로 1 - 2 - 3 - 1 - 2 - 3 ... 순서로 텍스쳐를 선택합니다.
**Spawn** 거리기반 하고 유사한 느낌이지만 단 차이는 인덱스 기반입니다.
[[video:assets/path repeater/videos/Textures Mode]]
</topic>
**Textures** 멀티 텍스쳐를 위한 커스텀 파라미터입니다. 파라미터의 줄을 클릭하면 레이어의 인덱스를 입력할 수 있는 창이 나타납니다.
컴포지션내에 원하는 텍스쳐 레이어의 인덱스를 입력합니다. (입력후에 레이어 순서가 바뀌어도 괜찮습니다.)
특수하게 0을 입력할 수 있으며 이 경우에는 투명 레이어로 인식됩니다.
점 아이콘을 더블 클릭하여 교체할 수 있습니다. 점 아이콘을 밑으로 드래그하여 제거할 수 있습니다.
효과가 적용된 단색 레이어를 입력할 수 없습니다. (자기자신 참조 불가)
[[sub-image 25:assets/path repeater/images/텍스쳐 레이어 입력]] [[sub-image 25:assets/path repeater/images/텍스쳐 레이어 입력 2]]
</topic>
</topic>
<topic "Time Sampling">
텍스쳐 레이어의 타임 샘플링을 정합니다.
<topic "Mode 타임 샘플링 계산의 기본이 되는 모드 입니다.">
**Still Frame** 정지된 시간(0)으로 샘플링합니다.
**Current Time** 현재 시간으로 샘플링합니다.
**Loop** 현재 시간으로 샘플링합니다. 단 텍스쳐 레이어의 지속시간을 넘어가면 처음으로 돌아갑니다.
**Ping Pong** 현재 시간으로 샘플링합니다. 단 텍스쳐 레이어의 지속시간을 넘어가면 거꾸로 처음으로 돌아갑니다.
A -> B -> C -> B-> A -> B -> C ...
</topic>
**Radnom Start(s)** 맨처음 시작 시간을 레이어 지속시간중에서 랜덤으로 선택합니다.
**Start Time(s)** 타임 샘플링에 지정한 값을 더합니다.
**Offset Time(s)** 타임 샘플링에 레이어 인덱스를 곱한 값을 더합니다.
**Radnom Time(s)** 타임 샘플링에 지정된 수치 범위중 랜덤한 수치를 더합니다.
**Fast Time** 텍스쳐 레이어의 프레임단위와 일치하지않는 시간을 텍스쳐 레이어의 프레임 단위로 일치 시킵니다.
성능 최적화 관련 기능입니다.

타임 샘플링 기능은 성능에 큰 영향을 줄 수 있습니다.
100개의 레이어를 복사하는 경우와 10개의 레이어를 10배로 복사하는 경우는 내부 처리 비용이 서로 다릅니다.
타임 샘플링 값이 서로 다를 경우, 내부적으로 새로운 텍스처가 생성되기 때문에 성능 비용이 크게 증가합니다.
***Still Frame Mode***와 ***Random Start***를 조합해 무작위 프레임을 선택할 때를 예로 들어보겠습니다.
1프레임 간격으로 10개의 레이어를 사용해 구성한 총 10프레임 텍스처 레이어
2프레임 간격으로 10개의 레이어를 사용해 구성한 총 20프레임 텍스처 레이어
비교하면, 전자의 경우가 더 빠르게 동작합니다.

(텍스처 레이어가 캐시 가능한 조건을 만족한다면 캐시를 활용하여 성능을 향상시킬 수 있습니다. 캐시가 적용되기 위한 조건은 텍스처 레이어, 타임 샘플링 값, 컬러 파라미터 값이 모두 동일한 경우입니다.)
</topic>
<topic "Trimming">
***After Effect의 기본 기능인 패스 다듬어 자르기***와 같은 방식으로 작동합니다.
**Smoothness** 자르기에 페더를 줍니다. 소수점의 복제는 Interpolation 에 영향을 받습니다.
</topic>
<topic "Interpolation">
소수점의 복제로 인해서 아직 덜 복제된 복제를 처리하는 방법을 결정합니다.
**Filter Complete Copie** 완전히 복제된 복제만 보이게 합니다.
**Scale** 덜 복제된 복제의 스케일을 조절합니다.
**Opacity** 덜 복제된 복제의 불투명도를 조절합니다.
</topic>
<topic "Color">
**Color** 점 아이콘을 더블 클릭하여 색상을 바꾸거나 밑으로 드래그하여 제거할 수 있습니다.
**Opacity** 설정된 Blending로 혼합될 강도(불투명도)를 뜻합니다.
**Mode** 색상 선정 방식을 고릅니다.
**Blending** 색상 혼합 모드를 설정합니다.
[[video:assets/path repeater/videos/Color]]
</topic>
<topic "Copie Transform">
복제에 대한 변형입니다.
**Path Rotation** 패스의 방향으로 회전합니다.
[[video:assets/path repeater/videos/Path Rotation]]
</topic>
<topic "Distance">
거리에 따른 변화를 줄 수 있습니다.
파라미터 이름에 **F*** 가 붙은 경우에는 패스의 ***Offset*** 기능에 영향을 받지 않습니다. (Fixed)
[[video:assets/path repeater/videos/Path Distance]]
</topic>
<topic "Replica">
단순한 픽셀 복제가 아니라, 반복되는 객체 자체를 복제하는 방식입니다.
[[video:assets/path repeater/videos/Replica]]
**Attribute Copy**를 사용하면 복제된 객체의 속성을 원본 객체의 속성과 동기화할 수 있습니다.
**Textures Copy**는 ***Textures***모드에서 텍스처 복제를 원본과 동기화하는 기능입니다.
</topic>
<topic "Space">
x y z의 공간을 설정하여 공간을 벗어나면 다시 될 돌아가게 할 수 있습니다.
슬라이더 **X Y Z Range**는 공간을 설정합니다 px 단위입니다.
커브 **X Y Z Range** 는 공간에 대한 옵션입니다.
[[video:assets/path repeater/videos/Space]]
컴포지션의 크기였던 X Range를 낮춘 모습
<topic "Loop Random">
"Space Loop Random Seed" 루프할떄마다 시드를 변경합니다.
"X Y Z Position" Space에 영향을 받은 뒤에 작동하는 랜덤 위치 변형입니다.
</topic>
</topic>
<topic "Camera">
카메라에 대한 설정입니다. 기본값은 ***No Camera*** 입니다. 카메라를 사용하거나 x y 축의 회전처럼 3D 변형을 수행하는 경우
***AE Camera***로 설정하고 카메라 레이어를 만들어야합니다.
피사계 심도는 카메라의 설정에 따라갑니다.
만약 카메라의 피사계심도를 활성화 했는데 효과의 블러는 없앴고 싶을 경우 Blur Strength를 0으로 합니다.
</topic>
**Downsampling** 텍스쳐레이어의 화질을 뜻합니다. 낮추면 성능이 빨라질 수 있습니다.
**Seed** 모든 랜덤은 시드기반 랜덤으로 작동합니다.
`

,
        faq: `${updateText.ko}`
    },
    ja: {
        quick: `ランダムに依存していたパーティクルを脱し、パスに沿って設計された繰り返しモーションを実現します。
パスを変更した瞬間、結果は即座に反映され、200以上のパラメータが有機的に作用して創造的なアイデアを広げます。
名前とは異なりますが、Grid、Circle、Spiralなどの基本的な繰り返しパターンを提供し、別のパスがなくてもすぐに作業を開始できます。
[[video:assets/path repeater/videos/구름]]
[[video:assets/path repeater/videos/4분할]]
`,
        params: commonParamsText.ja + `
[[toggle-image パラメータを見る:assets/path repeater/images/파라미터]]
<topic "Repeater Mode">
**繰り返し方法を設定します。**
[[video:assets/path repeater/videos/Repeater Mode]]
<topic open "Path">
マスクパス、またはテキストレイヤーを指定できます。  
**All Path** はレイヤーに適用されているすべてのマスクを対象にします。  
**Edge & Vertex** の2つのモードが存在します。
<topic "Vertex">
**Bezier Scale**  
パスのベジェハンドルを距離に比例してスケールします。
**Scale Per Distance**  
距離に基づくスケール計算の基準値を設定します。
**Bezier Rotation**  
ベジェ方向に沿って回転を適用します。
[[video:assets/path repeater/videos/Vertex]]
</topic>
<topic open "Edge">
**Copies** パス上に複製する数を指定します。小数点をサポートし、小数部分は ***Interpolation*** に影響します。
**Interval** 複製間隔を指定します。パス全体の長さを基準に配置されます。
**Random Interval** 間隔にランダム値を追加します。値が大きいほど不規則になります。
**Offset** パスの方向に沿って複製全体を移動します。
**Offset Loop** オフセット移動時に、パスの始点と終点を接続してループさせます。
**Loop Random Seed** ***Offset Loop*** によりループが発生するたび、***Random*** のシードが更新されます。
[[video:assets/path repeater/videos/Loop Radnom Seed]]
上：OFF / 下：ON の例です。  
ループごとに、上は同じ印象が繰り返され、下は変化しているのが確認できます。
</topic>
</topic>
</topic>
**Index Reverse** インデックスを反転します。インデックスは描画順（Z軸が同一の場合）およびインデックス関連エフェクトに影響します。
<topic "Repeater Transform">
パス自体に3D変形を適用するオプションです。  
**Controller Layer** は指定したレイヤーのトランスフォームを参照して適用します。
[[video:assets/path repeater/videos/Cotroller Layer]]
***Mask Path*** をエクスプレッションで ***Shape Layer*** のパスに変換し、  
そのシェイプレイヤーを ***Controller Layer*** として指定した例です。
*3D軸変形を行う場合は、Camera を「AE Camera」に設定し、カメラレイヤーを作成することで完全に一致します。*
</topic>
<topic "Texture">
複製に使用するレイヤーを指定します。  
**Texture Layer** と **Text Layers** の2つの方式があります。
**Texture Layer** 単一テクスチャ用のモードです。
**Texture Layers** カスタムパラメータで動作するマルチテクスチャ用モードです。
<topic "Text Layers">
<topic "Textures Mode は、複数テクスチャの選択ルールを定義します。">
**Distance** 距離ベースで切り替えます。パス上で最も近い距離のテクスチャを選択します。
**Distance F** ***F*** が付くパラメータは、***Offset*** の影響を受けません。
**Random** ランダムにテクスチャを選択します。
**Check** チェックパターン（1-2-3-1-2-3…）で選択します。
**Spawn** 距離ベースに似ていますが、インデックス基準で動作します。
[[video:assets/path repeater/videos/Textures Mode]]
</topic>
**Textures** マルチテクスチャ用カスタムパラメータです。  
行をクリックするとレイヤーインデックス入力ウィンドウが表示されます。
コンポジション内の任意のテクスチャレイヤーのインデックスを入力します  
（入力後にレイヤー順が変わっても問題ありません）。
0 を入力すると透明レイヤーとして扱われます。  
ドットアイコンをダブルクリックで置換、下にドラッグで削除できます。  
エフェクトが適用された単色レイヤーは指定できません（自己参照不可）。

[[sub-image 25:assets/path repeater/images/텍스쳐 레이어 입력]] [[sub-image 25:assets/path repeater/images/텍스쳐 레이어 입력 2]]
</topic>
</topic>
<topic "Time Sampling">
テクスチャレイヤーの時間サンプリングを設定します。
<topic "Mode は時間計算の基本モードです。">
**Still Frame** 時間0で固定サンプリングします。
**Current Time** 現在時間でサンプリングします。
**Loop** レイヤーの長さを超えると先頭に戻ります。
**Ping Pong** 末端で反転して再生します。  
A → B → C → B → A → …
</topic>
**Random Start (s)** 開始時間をレイヤーの持続時間内でランダムに選択します。
**Start Time (s)** 指定値を加算します。
**Offset Time (s)** レイヤーインデックス × 値を加算します。
**Random Time (s)** 指定範囲内のランダム値を加算します。
**Fast Time**  
フレーム単位に揃え、パフォーマンスを最適化します。
タイムサンプリングはパフォーマンスに大きく影響します。  
100レイヤーを複製する場合と、10レイヤーを10倍複製する場合では内部コストが異なります。
***Still Frame*** と ***Random Start*** を組み合わせた場合、  
10フレーム構成のテクスチャは、20フレーム構成より高速です。
（テクスチャレイヤー、タイムサンプリング、カラー値が完全一致する場合、キャッシュが使用されます。）
</topic>
<topic "Trimming">
After Effects 標準の「パスのトリミング」と同様に動作します。
**Smoothness** トリミング部分にフェザーを適用します。
</topic>
<topic "Interpolation">
小数複製の処理方法を定義します。
**Filter Complete Copie**  
完全な複製のみ表示します。
**Scale** 未完成複製のスケールを調整します。
**Opacity** 未完成複製の不透明度を調整します。
</topic>
<topic "Color">
**Color** ドットをダブルクリックで変更、ドラッグで削除できます。
**Opacity** ブレンディング強度を指定します。
**Mode** 色の選択方式です。
**Blending** ブレンドモードを設定します。
[[video:assets/path repeater/videos/Color]]
</topic>
<topic "Copie Transform">
複製に関する変形です。
**Path Rotation** パスの方向に沿って回転します。
[[video:assets/path repeater/videos/Path Rotation]]
</topic>
<topic "Distance">
距離に応じた変化を与えることができます。
パラメータ名に **F*** が付いている場合、パスの ***Offset*** 機能の影響を受けません。（Fixed）
[[video:assets/path repeater/videos/Path Distance]]
</topic>
<topic "Replica">
単純なピクセルの複製ではなく、繰り返されるオブジェクト自体を複製する方式です。
[[video:assets/path repeater/videos/Replica]]
**Attribute Copy** を使用すると、複製されたオブジェクトの属性を元のオブジェクトの属性と同期できます。
**Textures Copy** は ***Textures*** モード時に、テクスチャの複製を元の状態と同期する機能です。
</topic>
<topic "Space">
X Y Z の空間を設定し、空間の範囲を超えた場合に再び戻るようにできます。
スライダー **X Y Z Range** は空間の範囲を設定します。単位は px です。
カーブ **X Y Z Range** は空間に関するオプションです。
[[video:assets/path repeater/videos/Space]]
コンポジションサイズだった X Range を下げた例
<topic "Loop Random">
"Space Loop Random Seed" はループするたびにシードを変更します。
"X Y Z Position" は Space の影響を受けた後に適用されるランダムな位置変形です。
</topic>
</topic>
<topic "Camera">
カメラに関する設定です。初期値は ***No Camera*** です。
カメラを使用する場合や、X Y 軸の回転など 3D 変形を行う場合は
***AE Camera*** に設定し、カメラレイヤーを作成する必要があります。
被写界深度はカメラの設定に従います。
カメラの被写界深度を有効にしていて、エフェクト側のブラーを無効にしたい場合は
Blur Strength を 0 に設定してください。
</topic>
**Downsampling** はテクスチャレイヤーの画質を示します。下げることでパフォーマンスが向上する場合があります。
**Seed** すべてのランダム処理はシードベースで動作します。
`
,
        faq: `${updateText.ja}`
    },

    en: {
        quick: `Break free from particle randomness and implement designed repeat motion along a path.
As soon as you change the path, the results respond immediately, and over 200 parameters work organically to expand your creative imagination.
Despite the name, basic repeat patterns such as Grid, Circle, and Spiral are provided, allowing you to start working instantly without a separate path.
[[video:assets/path repeater/videos/구름]]
[[video:assets/path repeater/videos/4분할]]
`,
        params: commonParamsText.en + `
[[toggle-image View Parameters:assets/path repeater/images/파라미터]]
<topic "Repeater Mode">
**Sets the repeat mode.**
[[video:assets/path repeater/videos/Repeater Mode]]
<topic open "Path">
You can specify a mask path or a text layer.
**All Path** applies all masks applied to the layer.
**Edge & Vertex** two modes are available. 
<topic "Vertex">
**Bezier Scale** Scales Bezier handles proportionally to distance.
**Scale Per Distance** Sets the reference scale based on distance.
**Bezier Rotation** Applies rotation based on the Bezier direction of the path.
[[video:assets/path repeater/videos/Vertex]]
</topic>
<topic open "Edge">
**Copies** The number of copies to duplicate along the path. Decimal values are supported, and decimals affect ***Interpolation***.
**Interval** Selects the spacing between copies. Copies are placed at intervals based on the total path length.
**Radnom Interval** Adds randomness to the spacing. Higher values result in more irregular placement.
**Offset** Moves the copies along the direction of the path.
**Offset Loop** When offsetting along the path, the start and end of the path are connected and looped.
**Loop Radnom Seed** Each time a ***loop*** occurs due to ***Offset Loop***, the seed value of ***Radnom*** changes.
[[video:assets/path repeater/videos/Loop Radnom Seed]]
Top: OFF / Bottom: ON example.
You can see that when a loop occurs, the top shows a repeating pattern.
</topic>
</topic>
</topic> 
**Index Reverse** Reverses the index. The index affects draw order (when Z-axis is the same) and index-based effects.
<topic "Repeater Transform">
Think of this as applying 3D transformations to the path itself.
**Controller Layer** applies the transform values from a specified layer.
[[video:assets/path repeater/videos/Cotroller Layer]]
This shows a ***Mask Path*** converted into a ***Shape Layer*** path via expressions, and that shape layer selected as the ***Controller Layer***.
*When performing 3D axis transformations, set the Camera option to AE Camera and create a camera layer for perfect alignment.*
</topic>
<topic "Texture">
Select the layer to be duplicated. There are two modes: **Texture Layer** and **Text Layers**.
**Texture Layer** is a mode for a single texture layer.
**Texture Layers** is a mode for multiple texture layers driven by custom parameters.
<topic "Text Layers">
<topic "Textures Mode defines the rule for selecting which texture to use among multiple textures.">
**Distance** Changes based on distance. Selects the texture closest to the path distance.
**Distance F** Parameters marked with ***F*** are not affected by the path ***Offset*** function.
**Random** Randomly selects a texture. One texture is picked from a random position.
**Check** Selects textures in a checkered pattern: 1 - 2 - 3 - 1 - 2 - 3 ...
**Spawn** Similar to distance-based behavior, but the key difference is that it is index-based.
[[video:assets/path repeater/videos/Textures Mode]]
</topic>
**Textures** A custom parameter for multi-texture setups. Clicking a parameter row opens a window to input a layer index.
Enter the index of the desired texture layer in the composition. (It is okay if the layer order changes afterward.)
You can also enter 0, which will be recognized as a transparent layer.
Double-click the dot icon to replace it. Drag the dot icon downward to remove it.
Solid layers with the effect applied cannot be used. (Self-reference is not allowed.)
[[sub-image 25:assets/path repeater/images/텍스쳐 레이어 입력]] [[sub-image 25:assets/path repeater/images/텍스쳐 레이어 입력 2]]
</topic>
</topic>
<topic "Time Sampling">
Sets the time sampling for texture layers.
<topic "Mode is the base mode used for time sampling calculations.">
**Still Frame** Samples at a fixed time (0).
**Current Time** Samples at the current time.
**Loop** Samples at the current time. If it exceeds the texture layer duration, it loops back to the start.
**Ping Pong** Samples at the current time. If it exceeds the texture layer duration, it reverses back to the start.
A -> B -> C -> B -> A -> B -> C ...
</topic>
**Radnom Start(s)** Randomly selects the initial start time within the layer duration.
**Start Time(s)** Adds a specified value to the time sampling.
**Offset Time(s)** Adds a value multiplied by the layer index to the time sampling.
**Radnom Time(s)** Adds a random value within the specified range to the time sampling.
**Fast Time** Aligns non-frame-aligned times to the texture layer’s frame units.
A performance optimization feature.

Time sampling can have a significant impact on performance.
Copying 100 layers and copying 10 layers 10 times have different internal processing costs.
When time sampling values differ, new textures are generated internally, greatly increasing performance cost.
As an example, let’s compare using ***Still Frame Mode*** combined with ***Random Start*** to select random frames.
A total 10-frame texture layer composed of 10 layers sampled at 1-frame intervals
A total 20-frame texture layer composed of 10 layers sampled at 2-frame intervals
In comparison, the former runs faster.

(If texture layers meet the conditions for caching, performance can be improved using cache.
The conditions for cache application are that the texture layer, time sampling values, and color parameter values are all identical.)
</topic>
<topic "Trimming">
Works in the same way as After Effects’ built-in Trim Paths feature.
**Smoothness** Adds feathering to the trim. Decimal copies affect Interpolation.
</topic>
<topic "Interpolation">
Determines how partially created copies are handled when using decimal copy values.
**Filter Complete Copie** Displays only fully created copies.
**Scale** Adjusts the scale of partially created copies.
**Opacity** Adjusts the opacity of partially created copies.
</topic>
<topic "Color">
**Color** Double-click the dot icon to change the color, or drag it downward to remove it.
**Opacity** Refers to the blending strength (opacity) applied with the selected Blending mode.
**Mode** Selects the color selection method.
**Blending** Sets the color blending mode.
[[video:assets/path repeater/videos/Color]]
</topic>
<topic "Copie Transform">
Transforms related to duplication.
**Path Rotation** Rotates along the direction of the path.
[[video:assets/path repeater/videos/Path Rotation]]
</topic>
<topic "Distance">
Allows changes based on distance.
If the parameter name includes **F***, it is not affected by the path ***Offset*** feature. (Fixed)
[[video:assets/path repeater/videos/Path Distance]]
</topic>
<topic "Replica">
This is not a simple pixel duplication, but a method that duplicates the repeating object itself.
[[video:assets/path repeater/videos/Replica]]
Using **Attribute Copy**, the attributes of duplicated objects can be synchronized with the attributes of the original object.
**Textures Copy** synchronizes texture duplication with the original when in ***Textures*** mode.
</topic>
<topic "Space">
You can define an X Y Z space and make objects return when they go outside the defined space.
The **X Y Z Range** slider defines the space range in pixels.
The **X Y Z Range** curve provides options related to the space.
[[video:assets/path repeater/videos/Space]]
An example where the X Range, originally set to the composition size, has been reduced.
<topic "Loop Random">
"Space Loop Random Seed" changes the seed each time it loops.
"X Y Z Position" is a random position transform applied after being affected by Space.
</topic>
</topic>
<topic "Camera">
Settings related to the camera. The default value is ***No Camera***.
When using a camera or performing 3D transformations such as X Y axis rotation,
set this to ***AE Camera*** and create a camera layer.
Depth of field follows the camera settings.
If depth of field is enabled on the camera but you want to disable the effect blur,
set Blur Strength to 0.
</topic>
**Downsampling** refers to the image quality of the texture layer. Lowering it can improve performance.
**Seed** All random behavior operates based on a seed.

`,
        faq: `${updateText.en}`
    }
};

const pluginLogs = {
    "smart-stroke": smartStrokeLog,
    "path-repeater": pathRepeaterLog
};

let toggleGroupCounter = 0;
let toggleImageCounter = 0;
function renderMarkdown(text) {

     // ------------------------------
    // 0. 모든 엔터 처리
    // ------------------------------
    // 연속된 줄바꿈도 하나만 남기고, 단일 줄바꿈도 제거
    // 방법: 2개 이상 연속도 하나로 줄이고, 남은 줄바꿈은 제거
// 0. 모든 엔터 처리
// 1) 일반 <topic "Label"> 뒤 엔터 제거
// 1) <topic ...> 뒤 엔터 제거
// 1) <topic ...> 뒤 엔터 제거
text = text.replace(/(<topic\s*(?:open\s*)?"[^"]+">)\r?\n/g, '$1');
text = text.replace(/(<topic\s+open\s*"[^"]+">)\r?\n/g, '$1');

// 3) </topic> 뒤 엔터 제거 (다음 <topic>이 올 때만, 공백 제거하지 않음)
text = text.replace(/<\/topic>\s*\n\s*/g, '</topic> ');

function parseTopicsRecursive(str) {
    let result = '';
    let index = 0;

    while (index < str.length) {
        const openMatch = str.slice(index).match(/<topic\s*(open\s*)?"([^"]+)">/);
        if (!openMatch) {
            // 더 이상 <topic> 없으면 남은 문자열 그대로 추가
            result += str.slice(index);
            break;
        }

        const openStart = index + openMatch.index;
        const openEnd = openStart + openMatch[0].length;
        const isOpen = !!openMatch[1]; // open 여부
        const label = openMatch[2];    // 라벨

        // <topic> 태그 이전 문자열 추가
        result += str.slice(index, openStart);

        // 닫는 태그 찾기
        let depth = 1;
        let searchIndex = openEnd;
        let closeIndex = -1;
        const closeTag = "</topic>";

        while (depth > 0 && searchIndex < str.length) {
            const remaining = str.slice(searchIndex);
            const nextOpenRel = remaining.search(/<topic\s*(open\s*)?"[^"]+">/);
            const nextCloseRel = remaining.indexOf(closeTag);

            if (nextCloseRel === -1) break;

            if (nextOpenRel !== -1 && nextOpenRel < nextCloseRel) {
                // 중첩된 <topic> 발견
                depth++;
                searchIndex += nextOpenRel + remaining.match(/<topic\s*(open\s*)?"[^"]+">/)[0].length;
            } else {
                depth--;
                searchIndex += nextCloseRel + closeTag.length;
                if (depth === 0) closeIndex = searchIndex;
            }
        }

        if (closeIndex === -1) closeIndex = str.length;

        // 닫는 태그 시작 위치
        const closeStart = closeIndex - closeTag.length;

        // 열린 태그 끝부터 닫는 태그 시작까지 content 추출
        const content = str.slice(openEnd, closeStart);

        // 토글 HTML 생성
        const id = `toggle-group-${toggleGroupCounter++}`;
        const triangleId = `triangle-group-${toggleGroupCounter}`;

        result += `<div style="margin:0; padding:0;"> <div style="cursor:pointer; user-select:none; color:#fff;" onclick=" const el=document.getElementById('${id}'); const tri=document.getElementById('${triangleId}'); el.classList.toggle('hidden'); tri.style.transform = el.classList.contains('hidden') ? 'rotate(0deg) scale(0.8)' : 'rotate(90deg) scale(0.8)';"><span id="${triangleId}" style="display:inline-block; transition: transform 0.2s; transform:${isOpen ? 'rotate(90deg) scale(0.8)' : 'rotate(0deg) scale(0.8)'};">▶</span> ${label}</div><div id="${id}" class="${isOpen ? '' : 'hidden'}" style="margin-left:15px; margin-top:0; margin-bottom:0; padding:0;">${parseTopicsRecursive(content)}</div></div>`;

        index = closeIndex;
    }

    return result;
}


   // ------------------------------
    // 0. 마크다운, 이미지, 비디오 치환
    // ------------------------------
    text = text
    .replace(/\[\[toggle-image\s+(.+?):(.+?)\]\]/g, (match, label, src) => { 
        if (!src.match(/\.(jpg|jpeg|png|gif)$/i)) src = `${src}.jpg`; 
        const id = `toggle-img-${toggleImageCounter++}`; 
        const triangleId = `triangle-${toggleImageCounter}`; 
        return `<span style="display:inline-block;"><span style="color:#fff; cursor:pointer; user-select:none;" onclick=" const img = document.getElementById('${id}'); const tri = document.getElementById('${triangleId}'); img.classList.toggle('hidden'); tri.style.transform = img.classList.contains('hidden') ? 'rotate(0deg) scale(0.8)' : 'rotate(90deg) scale(0.8)';"> <span id="${triangleId}" style="display:inline-block; transition: transform 0.2s; transform: rotate(0deg) scale(0.8);">▶</span> ${label} </span><br><img id="${id}" src="${src}" class="hidden" style="max-width:100%; margin:10px 0;"></span>`; 
    })
    .replace(/\[\[sub-image (\d+):(.+?)\]\]/g, (match, width, src) => {
        if (!src.match(/\.(jpg|jpeg|png|gif)$/i)) src = `${src}.jpg`;
        return `<img src="${src}" style="width:${width}%; height:auto; display:inline-block; vertical-align:middle; margin-left:8px; margin:10px 0;">`;
    })
    .replace(/\[\[image:(.+?)\]\]/g, (match, src) => {
        if (!src.match(/\.(jpg|jpeg|png|gif)$/i)) src = `${src}.jpg`;
        return `<img src="${src}" style="max-width:100%; display:block; margin:10px 0;">`;
    })
  .replace(/\[\[sub-video (\d+):(.+?)\]\]/g, (match, width, src) => {
    if (!src.match(/\.(mp4|mov|webm)$/i)) src = `${src}.mp4`;
    return `<video src="${src}" autoplay muted loop style="width:${width}%; height:auto; display:inline-block; vertical-align:middle; margin-left:8px;"></video>`;
})
.replace(/\[\[video:(.+?)\]\]/g, (match, src) => {
    if (!src.match(/\.(mp4|mov|webm)$/i)) src = `${src}.mp4`;
    return `<video src="${src}" autoplay muted loop style="max-width:100%; margin:10px 0;"></video>`;
})
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>');

    // ------------------------------
    // 1. <topic> 재귀 파서 적용
    // ------------------------------
    const result = parseTopicsRecursive(text);

    return result;
}

function applyLanguage(lang) {
    document.querySelectorAll('.content-section').forEach(section => {
        const pluginKey = section.id;
        const log = pluginLogs[pluginKey];
        if (!log) return;

        section.querySelectorAll('.sub-section').forEach(el => {
            const subKey = el.dataset.sub;
            const text = log?.[lang]?.[subKey];
            if (text) {
                el.innerHTML = renderMarkdown(text);
            }
        });
    });
}


const langSelect = document.getElementById('language');

langSelect.addEventListener('change', e => {
    applyLanguage(e.target.value);
});

// 초기 로드
applyLanguage(langSelect.value);
activateSection(targetId);
applyLanguage(document.getElementById('language').value);

