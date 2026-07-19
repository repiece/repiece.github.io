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
<topic "Looking">
특정 위치를 바라보게 하는 기능입니다.
**3D Looking**를 통해서 3D로 바라보게 할 수 있습니다.
**Controller Layer**를 지정하여 레이어의 위치를 바라보게 할 수 있습니다.
[[video:assets/path repeater/videos/Looking]]
</topic>
<topic "Field">
**Mode**를 사용하여 범위를 설정한 후, **Origin** 값을 조정하거나 Null 레이어를 **Controller Layer**로 지정하세요.
설정된 범위 내의 복제만 아래 속성 그룹의 효과가 적용됩니다.
**3D Field**를 활성화하면 Z축을 포함한 3차원 공간에서 영향을 줄 수 있으며, 기본값은 2D Field입니다.
범위 내부에는 Weight 1, 범위 외부에는 Weight 0이 자동으로 적용됩니다.
**Strength**를 사용하여 Weight의 전체 강도를 조절할 수 있으며, **Weight Curve**를 통해 Weight가 적용되는 방식을 세밀하게 조정할 수 있습니다.
[[video:assets/path repeater/videos/Field Curve]]
**Feather**를 사용하면 설정한 픽셀 수만큼 범위 경계의 안쪽에서 Weight가 0~1 사이로 부드럽게 변화합니다.
**Feather Random**은 **Feather** 값에 랜덤값을 추가하여 경계의 부드러움을 복제마다 다르게 적용하는 기능입니다.
[[video:assets/path repeater/videos/Field Feather]]
<topic "Transform">
기본 변형 그룹입니다. 일부 효과들은 오버 Weight를 지원합니다.
[[video:assets/path repeater/videos/Field Scale]]
</topic>
<topic "Color">
***Color Gradient*** 파라미터의 왼쪽은 Weight 0, 오른쪽은 Max Weight에 해당합니다.
각 복제본은 자신의 Weight 값에 따라 해당하는 색상이 할당되며, **Opacity**를 통해 색상 블렌딩의 강도를 조절할 수 있습니다.
**Weight Opacity**를 활성화하면 Opacity 값에 Weight가 곱연산으로 적용되어, 복제마다 서로 다른 Opacity 값을 적용할 수 있습니다.
[[video:assets/path repeater/videos/Field Color]]
</topic>
<topic "Force">
**Force**는 양수일 경우 복제본을 원점으로부터 밀어내고, 음수일 경우 원점 방향으로 끌어당깁니다.
**Negative Force Kill** 음수 Force에 의해 끌려온 복제가 원점을 지나치게 될 경우 해당 복제본을 제거합니다.
</topic>
<topic "Time Smapling">
기존 ***Time Sampling*** 값에 합연산으로 적용됩니다.
**Offset Delay**를 사용하면 ***Offset Delay X Weight*** 값만큼 ***Time Sampling***을 지연시킬 수 있습니다.
기존 ***Time Sampling - Mode***를 ***Still Frame***으로 설정하고 적절한 수치를 주면 애니메이션 재생에도 대응할 수 있습니다.
[[video:assets/path repeater/videos/Field Time]]
</topic>
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
<topic "Looking">
指定した位置を向かせる機能です。
**3D Looking** を有効にすると、3D空間上で対象を向くようになります。
**Controller Layer** を指定すると、そのレイヤーの位置を向くように設定できます。
[[video:assets/path repeater/videos/Looking]]
</topic>
<topic "Field">
**Mode** を使用して影響範囲を設定し、**Origin** の値を調整するか、Nullレイヤーを **Controller Layer** として指定してください。
設定した範囲内の複製にのみ、下記のプロパティグループの効果が適用されます。
**3D Field** を有効にすると、Z軸を含む3次元空間で影響を与えることができます。デフォルトは2D Fieldです。
範囲内の複製には Weight 1、範囲外の複製には Weight 0 が自動的に適用されます。
**Strength** を使用して Weight の全体的な強さを調整できます。また、**Weight Curve** を使用することで Weight の適用方法を細かく制御できます。
[[video:assets/path repeater/videos/Field Curve]]
**Feather** を使用すると、指定したピクセル数の範囲で境界の内側から Weight が 0～1 に滑らかに変化します。
**Feather Random** は **Feather** の値にランダム値を加え、複製ごとに異なるフェード幅を適用する機能です。
[[video:assets/path repeater/videos/Field Feather]]
<topic "Transform">
基本的な変形グループです。
一部のパラメータは Weight による制御に対応しています。
[[video:assets/path repeater/videos/Field Scale]]
</topic>
<topic "Color">
***Color Gradient*** パラメータの左端は Weight 0、右端は最大 Weight を表します。
各複製には自身の Weight 値に応じた色が割り当てられ、**Opacity** で色のブレンド強度を調整できます。
**Weight Opacity** を有効にすると、Opacity に Weight が乗算されるため、複製ごとに異なる不透明度を適用できます。
[[video:assets/path repeater/videos/Field Color]]
</topic>
<topic "Force">
**Force** が正の値の場合は複製を原点から押し出し、負の値の場合は原点方向へ引き寄せます。
**Negative Force Kill** を有効にすると、負の Force によって原点を通り過ぎた複製が削除されます。
</topic>
<topic "Time Sampling">
既存の ***Time Sampling*** の値に加算して適用されます。
**Offset Delay** を使用すると、***Offset Delay × Weight*** の値だけ ***Time Sampling*** を遅延させることができます。
また、***Time Sampling - Mode*** を ***Still Frame*** に設定し、適切な値を指定することで、アニメーションが再生されている素材にも対応できます。
[[video:assets/path repeater/videos/Field Time]]
</topic>
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
<topic "Looking">
Makes each clone look toward a specific position.
Enable **3D Looking** to orient clones in 3D space.
You can assign a **Controller Layer** and have the clones look toward that layer's position.
[[video:assets/path repeater/videos/Looking]]
</topic>
<topic "Field">
Use **Mode** to define the area of influence, then adjust the **Origin** value or assign a Null object as the **Controller Layer**.
Only clones within the defined area will be affected by the property groups below.
Enable **3D Field** to affect clones in 3D space, including the Z axis. By default, the Field operates in 2D mode.
Clones inside the area are automatically assigned a Weight of 1, while clones outside the area receive a Weight of 0.
Use **Strength** to control the overall intensity of the Weight, and **Weight Curve** to fine-tune how the Weight is distributed.
[[video:assets/path repeater/videos/Field Curve]]
Use **Feather** to create a smooth transition from Weight 0 to 1 within the specified pixel distance from the boundary.
**Feather Random** adds a random variation to the **Feather** value, allowing each clone to have a slightly different falloff.
[[video:assets/path repeater/videos/Field Feather]]
<topic "Transform">
Basic transformation controls.
Some parameters support Weight-based influence.
[[video:assets/path repeater/videos/Field Scale]]
</topic>
<topic "Color">
In the ***Color Gradient*** parameter, the left side represents Weight 0 and the right side represents the maximum Weight.
Each clone is assigned a color based on its Weight value, and **Opacity** controls the blending strength of the assigned color.
When **Weight Opacity** is enabled, the Opacity value is multiplied by the clone's Weight, allowing each clone to have a different opacity.
[[video:assets/path repeater/videos/Field Color]]
</topic>
<topic "Force">
A positive **Force** value pushes clones away from the origin, while a negative value pulls them toward it.
When **Negative Force Kill** is enabled, any clone pulled past the origin by a negative Force will be removed.
</topic>
<topic "Time Sampling">
Applied additively to the existing ***Time Sampling*** value.
Use **Offset Delay** to delay the ***Time Sampling*** value by ***Offset Delay × Weight***.
You can also set ***Time Sampling - Mode*** to ***Still Frame*** and use an appropriate value to make the effect work with animated sources.
[[video:assets/path repeater/videos/Field Time]]
</topic>
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




const boundaryFillLog = {
    ko: {
        quick: `텍스트의 형태를 분석하여, 모양 레이어로 변환하는 과정 없이도 텍스트를 따라가는 텍스처를 적용할 수 있는 효과입니다.
공식적으로 After Effects에서는 글자의 위치나 크기 등의 정보를 직접 가져오는 방법이 없지만, 다양한 알고리즘을 통해 높은 정확도의 추적을 구현했습니다.
또한 비파괴 방식으로 텍스트 레이어의 형태를 그대로 유지하므로, 텍스트 레이어 고유의 기능인 텍스트 애니메이터와도 완벽하게 호환됩니다.
**텍스처가 텍스트를 따라가도록 장인정신을 발휘할 필요는 없습니다. 클릭 한 번이면, 마법처럼 완성됩니다.**
[[video:assets/boundary fill/videos/예시1]]
위 애니메이션의 제작 과정을 상상해보세요. **Boundary Fill**이라면 모양 레이어 하나, 텍스트 레이어 하나. 그게 전부입니다.
[[video:assets/boundary fill/videos/예시2]]
텍스처에 제한은 없습니다. 이미지든, 그림이든, 무엇이든 원하는 대로 적용할 수 있습니다.
[[video:assets/boundary fill/videos/예시3]]
크기, 회전, 불투명도를 추적하며 100가지 이상의 다양한 파라미터를 통해 창의적인 연출을 시도해보세요
[[video:assets/boundary fill/videos/시연]]
사용 방법은 놀라울 만큼 간단합니다. 텍스트 레이어에 효과를 적용하고 TextSave를 클릭한 뒤, 원하는 텍스처를 선택하세요.
위치가 마음에 들지 않는다면? 컴포지션에서 바로 드래그하세요. 회전과 크기 조정도 직관적으로 제어할 수 있습니다.
이 부분은 텍스처를 따라가지 않게 하고 싶으신가요? 우클릭 한 번이면 충분합니다.
`,
        params: commonParamsText.ko + `
        v 3.0.0 에 대한 설명입니다.
<topic open "Text Save">
**Text Save는 After Effects의 한계를 최대한 우회하기 위해 설계된 기능입니다.**
모든 값은 세이브 버튼을 누르는 순간에만 반영됩니다.
X Merge는 텍스트의 외곽선을 기준으로 X 값만큼 수평 방향으로 확장하여, 이를 하나의 경계로 인식할지 결정하는 설정입니다.
Y Merge는 동일한 방식으로 수직 방향에 적용되는 설정입니다.
X Snap, Y Snap는 Merge가 적용된 경계의 위치값을 보정하여 한 줄로 깔끔하게 배치하는 기능입니다.
[[video:assets/boundary fill/videos/TextSave]]
문자 단위로 경계를 지정하고 싶으신가요? 문자 사이 간격이 좁다면 자간을 먼저 늘린 뒤 Save를 누르고, 다시 자간을 줄이는 방법도 있습니다.
*(앞서 말해듯이 After Effects의 기술적인 한계를 최대한 우회하는 방식으로 작동하기때문에 약간의 조작이 필요합니다.)*
Equal Spacing은 각 경계의 간격을 보정해줍니다 그리드 느낌의 텍스트일 경우 snap과 같이 사용하면 깔끔한 그리드를 만들 수 있습니다.
[[video:assets/boundary fill/videos/Equal Spacing]]
**V** Move & Scale
좌클릭 : 이동
좌클릭 + Shift : 스냅 이동
좌클릭 + Control : 크기 조절
우클릭 : 숨기기
**R** Rotation
좌클릭 : 회전
**T** Time
좌클릭 : 타임 딜레이 수치 조절
*0~1 범위 Time Sampling의 Delay Time(s)값에 곱해지는 수치입니다.*
</topic>
<topic "Snap">
snap 수치사이의 경계를 정렬시킵니다. 애니메이션이 적용된후에 깔끔한 정렬이 필요한 특수한 경우 사용하세요.
</topic>
<topic "Texture">
**Mode** 텍스쳐의 개수를 지정합니다.
**Texture** 텍스쳐를 지정합니다.
**Texture Solo** 텍스쳐만 보이게합니다.
**Blending Mode** 텍스트보다 **뒤에 있는**(Order와 연관되어있습니다.) 텍스쳐에 대한 Blending Mode입니다.
**Sub Texture** 텍스쳐를 복제합니다. **Radnom** 옵션과 같이 사용할 수 있습니다.
</topic>
<topic "Time Sampling">
텍스쳐에 대한 타임 샘플링입니다.
**Snap to Frames**는 텍스쳐의 시간 샘플링을 프레임 단위로 맞춰주는 옵션입니다. 성능 최적화와도 관련이 있습니다.
</topic>
**Texture Transform** 텍스쳐에 대한 변형입니다.
<topic "Layer Transform">
레이어에 대한 변형입니다.
정밀한 3D 트래킹을 지원하기 위해 본 효과는 자체 3D 공간을 제공합니다. Controller를 3D Null 레이어로 설정하면, 공간 내에서 보다 직관적으로 이동 및 제어가 가능합니다.
*After Effects 텍스트 레이어의 구조적 특성으로 인해, 레이어 자체에서 완전한 3D를 지원하는 것은 기술적으로 여러가지 문제가 있어 우회하는 방식으로 개발되었습니다.*
</topic>
<topic "Dynamic">
텍스트의 모양을 분석하여 작동합니다.
**Size Mode** 각각의 Size 축을 의미 합니다.
**Original Size** 기준이 되는 Size 입니다.
**Scale By Save Ratio** 저장된 시점의 텍스트 크기와 현재 크기를 비교하여 Scale를 결정합니다.
**Rotation** 세이브된 시점의 회전 각도를 0으로 설정하여 회전을 추적합니다.
**Opacity** 픽셀을 추적하여 불투명도 값에 맞게 텍스쳐의 불투명도를 조절합니다.
**Opacity** 픽셀 추적 알고리즘입니다.
Representative 대표값을 추적하여 불투명도를 결정합니다. 텍스트끼리 애니메이션중에 겹치는 경우에도 정확도를 높게 유지할 수 있습니다.
Max 최고값을 추적합니다. 텍스트가 겹치는 경우에는 정확도가 떨어질 수 있습니다. *속도는 빠릅니다.*
너무 얇은 1 픽셀의 선을 가진 텍스트라면 Max로 설정하는걸 추천드립니다.
</topic>
**Color** 텍스쳐에 대한 컬러 옵션입니다.
**Random** 텍스쳐에 대한 랜덤 옵션입니다.
<topic "Order">
텍스쳐를 그리는 순서를 결정합니다.
**In front** 텍스트보다 텍스쳐가 앞에 그려집니다.
**Behind** 텍스트보다 텍스쳐가 뒤에 그려집니다.
**Random** **in front Random** 수치에 따라 순서가 결정됩니다.
**Depth** 텍스쳐의 Z값에 따라 순서가 결정됩니다. **Camera** 를 **AE Camera**로 설정하고 z값의 차이가 있어야합니다.
</topic>
`

,
        faq: `${updateText.ko}`
    },
    ja: {
        quick: `テキストの形状を解析し、シェイプレイヤーへ変換することなく、テキストに追従するテクスチャを適用できるエフェクトです。
公式にはAfter Effectsでは文字の位置やサイズなどの情報を直接取得する方法はありませんが、独自のアルゴリズムにより高精度なトラッキングを実現しました。
さらに非破壊方式でテキストレイヤーの形状をそのまま保持するため、テキストレイヤー固有の機能であるテキストアニメーターとも完全に互換性があります。
**テクスチャをテキストに追従させるために職人技を発揮する必要はありません。ワンクリックで、魔法のように完成します。**
[[video:assets/boundary fill/videos/예시1]]
上記のアニメーションの制作工程を想像してみてください。**Boundary Fill**なら、シェイプレイヤー1つ、テキストレイヤー1つ。それだけです。
[[video:assets/boundary fill/videos/예시2]]
テクスチャに制限はありません。画像でも、イラストでも、あらゆる素材を自由に適用できます。
[[video:assets/boundary fill/videos/예시3]]
サイズ、回転、不透明度をトラッキングし、100種類以上の多彩なパラメータで創造的な演出をお試しください。
[[video:assets/boundary fill/videos/시연]]
使い方は驚くほど簡単です。テキストレイヤーにエフェクトを適用し、TextSaveをクリックしてから、適用したいテクスチャを選択してください。
位置が気に入らない場合は？コンポジション上で直接ドラッグしてください。回転やサイズ調整も直感的にコントロールできます。
この部分だけテクスチャを追従させたくないですか？右クリック一回で完了です。
`,
        params: commonParamsText.ja + `
         v 3.0.0 に関する説明です。
<topic open "Text Save">
**Text SaveはAfter Effectsの制限を最大限に回避するために設計された機能です。**
すべての値はSaveボタンを押した瞬間にのみ反映されます。
X Mergeはテキストのアウトラインを基準に、X値分だけ水平方向へ拡張し、それを1つの境界として認識するかを決定する設定です。
Y Mergeは同様の仕組みを垂直方向に適用する設定です。
X Snap、Y SnapはMergeが適用された境界の位置を補正し、1列にきれいに整列させる機能です。
[[video:assets/boundary fill/videos/TextSave]]
文字単位で境界を指定したいですか？文字間隔が狭い場合は、先にトラッキング（字間）を広げてからSaveを押し、その後元に戻す方法もあります。
*(前述の通り、After Effectsの技術的な制限を最大限回避する方式で動作しているため、多少の調整が必要です。)*
Equal Spacingは各境界の間隔を補正します。グリッド風のテキストの場合、Snapと併用すると整ったグリッドを作ることができます。
[[video:assets/boundary fill/videos/Equal Spacing]]
**V** Move & Scale
左クリック : 移動
左クリック + Shift : スナップ移動
左クリック + Control : サイズ調整
右クリック : 非表示
**R** Rotation
左クリック : 回転
**T** Time
左クリック : タイムディレイ値の調整
*0〜1の範囲で、Time SamplingのDelay Time(s)値に乗算される数値です。*
</topic>
<topic "Snap">
snap値間の境界を整列させます。アニメーション適用後にきれいな整列が必要な特殊なケースで使用してください。
</topic>
<topic "Texture">
**Mode** テクスチャの数を指定します。
**Texture** テクスチャを指定します。
**Texture Solo** テクスチャのみを表示します。
**Blending Mode** テキストより**後ろにある**（Orderと関連しています）テクスチャに対するブレンドモードです。
**Sub Texture** テクスチャを複製します。**Random**オプションと併用可能です。
</topic>
<topic "Time Sampling">
テクスチャに対するタイムサンプリングです。
**Snap to Frames**はテクスチャの時間サンプリングをフレーム単位に合わせるオプションです。パフォーマンス最適化にも関係します。
</topic>
**Texture Transform** テクスチャに対する変形です。
<topic "Layer Transform">
レイヤーに対する変形です。
正確な3Dトラッキングをサポートするため、本エフェクトは独自の3D空間を提供します。Controllerを3D Nullレイヤーに設定すると、空間内でより直感的に移動および制御が可能です。
*After Effectsのテキストレイヤーの構造的特性により、レイヤー自体で完全な3Dをサポートすることは技術的に複数の問題があり、回避方式で開発されています。*
</topic>
<topic "Dynamic">
テキストの形状を解析して動作します。
**Size Mode** 各Size軸を意味します。
**Original Size** 基準となるSizeです。
**Scale By Save Ratio** 保存時点のテキストサイズと現在のサイズを比較してScaleを決定します。
**Rotation** 保存時点の回転角度を0に設定し、回転をトラッキングします。
**Opacity** ピクセルをトラッキングし、不透明度値に応じてテクスチャの不透明度を調整します。
**Opacity** ピクセルトラッキングアルゴリズムです。
Representative 代表値をトラッキングして不透明度を決定します。テキスト同士がアニメーション中に重なった場合でも高い精度を維持できます。
Max 最大値をトラッキングします。テキストが重なった場合は精度が低下する可能性があります。*速度は高速です。*
非常に細い1ピクセル線のテキストの場合はMax設定を推奨します。
</topic>
**Color** テクスチャに対するカラーオプションです。
**Random** テクスチャに対するランダムオプションです。
<topic "Order">
テクスチャの描画順を決定します。
**In front** テキストより前にテクスチャが描画されます。
**Behind** テキストより後ろにテクスチャが描画されます。
**Random** **in front Random**値に応じて順序が決定されます。
**Depth** テクスチャのZ値に応じて順序が決定されます。**Camera**を**AE Camera**に設定し、Z値に差がある必要があります。
</topic>
`
,
        faq: `${updateText.ja}`
    },

    en: {
        quick: `This effect analyzes the shape of text and allows you to apply textures that follow the text—without converting it into shape layers.
Officially, After Effects does not provide a way to directly access character position or size data. However, through various custom algorithms, we have achieved highly accurate tracking.
Because it works in a non-destructive way and preserves the original text layer, it remains fully compatible with native Text Animators.
**There is no need for craftsmanship to make textures follow text. One click, and it works like magic.**
[[video:assets/boundary fill/videos/예시1]]
Imagine the production process behind the animation above. With **Boundary Fill**, all you need is one shape layer and one text layer. That’s it.
[[video:assets/boundary fill/videos/예시2]]
There are no limits to textures. Images, illustrations—apply anything you want.
[[video:assets/boundary fill/videos/예시3]]
Track size, rotation, and opacity, and explore creative possibilities with over 100 adjustable parameters.
[[video:assets/boundary fill/videos/시연]]
Using it is surprisingly simple. Apply the effect to a text layer, click TextSave, then select the texture you want.
Not happy with the position? Just drag it directly in the composition. Rotation and scale can also be adjusted intuitively.
Want a specific area not to follow the texture? A single right-click is enough.
`,
        params: commonParamsText.en + `
Description for v 3.0.0.
<topic open "Text Save">
**Text Save is designed to bypass the limitations of After Effects as much as possible.**
All values are applied only at the moment the Save button is pressed.
X Merge expands horizontally by the specified X value based on the text outline and determines whether it should be recognized as a single boundary.
Y Merge applies the same logic vertically.
X Snap and Y Snap adjust the positions of merged boundaries so they align cleanly in a single row.
[[video:assets/boundary fill/videos/TextSave]]
Want to define boundaries per character? If the spacing between characters is too narrow, increase the tracking first, press Save, and then reduce the tracking again.
*(As mentioned earlier, because this works by bypassing technical limitations in After Effects, some manual adjustment may be required.)*
Equal Spacing corrects the spacing between boundaries. For grid-style text, using it together with Snap helps create a clean grid layout.
[[video:assets/boundary fill/videos/Equal Spacing]]
**V** Move & Scale
Left Click : Move
Left Click + Shift : Snap Move
Left Click + Control : Scale
Right Click : Hide
**R** Rotation
Left Click : Rotate
**T** Time
Left Click : Adjust Time Delay value
*This value (0–1 range) is multiplied by the Delay Time(s) in Time Sampling.*
</topic>
<topic "Snap">
Aligns boundaries between snap values. Use this in special cases where clean alignment is required after animation is applied.
</topic>
<topic "Texture">
**Mode** Specifies the number of textures.
**Texture** Selects the texture.
**Texture Solo** Displays only the texture.
**Blending Mode** The blending mode for textures positioned **behind** the text (related to Order).
**Sub Texture** Duplicates the texture. Can be used together with the **Random** option.
</topic>
<topic "Time Sampling">
Time sampling settings for the texture.
**Snap to Frames** Aligns texture time sampling to frame units. This is also related to performance optimization.
</topic>
**Texture Transform** Transformation settings for the texture.
<topic "Layer Transform">
Transformation settings for the layer.
To support precise 3D tracking, this effect provides its own 3D space. By setting the Controller to a 3D Null layer, you can intuitively move and control it within 3D space.
*Due to the structural characteristics of After Effects text layers, fully supporting native layer-level 3D presented multiple technical challenges, so this feature was implemented using a workaround approach.*
</topic>
<topic "Dynamic">
Operates by analyzing the shape of the text.
**Size Mode** Refers to each individual Size axis.
**Original Size** The reference size.
**Scale By Save Ratio** Determines scale by comparing the text size at the time of Save with the current size.
**Rotation** Sets the saved rotation value to 0 as a baseline and tracks rotation changes.
**Opacity** Tracks pixel data and adjusts the texture’s opacity accordingly.
**Opacity** Pixel tracking algorithm.
Representative Tracks a representative value to determine opacity. Maintains high accuracy even when text overlaps during animation.
Max Tracks the maximum value. Accuracy may decrease when text overlaps. *Faster performance.*
For extremely thin 1-pixel stroke text, Max mode is recommended.
</topic>
**Color** Color options for the texture.
**Random** Randomization options for the texture.
<topic "Order">
Determines the rendering order of textures.
**In front** Texture is drawn in front of the text.
**Behind** Texture is drawn behind the text.
**Random** Order is determined based on the **in front Random** value.
**Depth** Order is determined by the texture’s Z value. **Camera** must be set to **AE Camera**, and there must be differences in Z values.
</topic>
`,
        faq: `${updateText.en}`
    }
};


const textOneLog = {
    ko: {
        quick: `텍스트 레이어를 위한 새로운 **텍스트 렌더러 효과**입니다.
After Effects의 기존 텍스트 레이어가 가진 최소 단위인 ‘문자(Character)’보다 더 세밀한 글리프(Glyph) 단위로 텍스트를 분석하고 렌더링합니다.
또한 자체적인 텍스트 애니메이터와 ID 기반 변형 시스템을 제공하며, Stardust / Plexus 처럼 효과를 중첩해 관리하는 구조를 사용합니다.
이제 간단한 문자 분해 연출을 위해 텍스트 레이어를 모양 레이어로 변환하는 번거로운 과정 없이,
하나의 텍스트 레이어만으로 보다 깔끔하고 비파괴적인 방식의 텍스트 작업을 구성할 수 있습니다.
[[video:assets/text one/videos/텍스트 컬러 변경]]
Text Save를 통해 내부적으로 ID를 매핑하고, 컨트롤러 효과를 사용해 원하는 느낌을 자유롭게 연출해보세요.
[[video:assets/text one/videos/텍스트 변형]]
색상뿐만 아니라 기본적인 변형 또한 가능합니다.
[[video:assets/text one/videos/텍스트 애니메이터]]
자체적인 텍스트 애니메이터를 제공합니다.
효과 기반으로 설계된 텍스트 애니메이터 구조를 통해 기존 방식과는 다른 표현이 가능합니다.
**After Effects** 텍스트 애니메이터 -> 효과 적용
**Text One** 효과 적용 -> 텍스트 애니메이터
이 구조적 차이 덕분에, Text One은 효과가 적용된 최종 결과 자체에 애니메이션을 적용할 수 있으며, 기존 방식으로는 어려웠던 연출을 구현할 수 있습니다.
프랙탈 노이즈를 적용한 예시 입니다.
[[video:assets/text one/videos/차이점 설명]]
효과의 결과를 기반으로 동작하는 텍스트 애니메이터입니다.

자세한 사용 방법은 각 파라미터 설명을 참고해주세요.
`,
        params: commonParamsText.ko + `
[[toggle-image 파라미터 보기:assets/text one/images/파라미터]]
<topic open "Text Save">
**Text Save는 After Effects의 한계를 최대한 우회하기 위해 설계된 기능입니다.**
모든 값은 세이브 버튼을 누르는 순간에만 반영됩니다.
Text Sorting은 분해된 획들에 ID를 매핑하는 기준을 설정합니다. 예를 들어 Left로 설정하면, 왼쪽에서 오른쪽 순서대로 ID가 매핑됩니다.
효과가 적용된 텍스트의 형태와 시선 흐름에 맞춰 적절한 순서를 선택하는 것을 추천드립니다.
매핑된 ID는 컨트롤러와 텍스트 애니메이터의 애니메이션 순서에 영향을 줍니다.
None은 After Effects의 제공하는 기본 순서입니다.
**Controller Add** 를 통해 컨트롤러를 추가 할 수 있습니다.
**Animater Add** 를 통해 애니메이터를 추가 할 수 있습니다.
</topic>
<topic open "Controller">
**Start ID**와 **End ID**를 통해 컨트롤러가 제어할 글리프(Glyph) 범위를 지정할 수 있습니다.
각 컨트롤러에서는 *Color*와 *Transform*설정이 가능하며,
효과를 중첩해 동일한 *ID* 범위가 겹치는 경우에는 효과 패널에서 더 아래에 위치한 *Controller*가 우선 적용되어 덮어쓰기됩니다.
</topic>
<topic open "Animater">
자체적인 텍스트 애니메이터를 제공하며, After Effects의 기본 텍스트 애니메이터와 유사한 방식으로 동작합니다.
**Start**와 **End**를 통해 적용 범위를 지정하고,
그 범위 안에서 **Transform / Random / Wiggle** 효과를 적용해보세요.
[[video:assets/text one/videos/바운스]]
**Interpolation**을 통해 움직임의 속도감을 정할 수 있습니다.
바운스도 있으며 **Bounce Frequency**와**Bounce Decay**로 바운스의 느낌을 조절할 수 있습니다.
[[video:assets/text one/videos/센터 오더]]
**Order**를 통해 애니메이션 순서를 설정할 수 있습니다.
**Center**를 활용하면 가운데 부터 시작하는 애니메이션을 만들 수 있습니다.
[[video:assets/text one/videos/택스트 애니메이션 예시 1]]
기본적인 활용 방식은 **After Effects**의 텍스트 애니메이터와 거의 동일합니다.
예를 들어, 텍스트 애니메이터를 두 개 사용하여 하나는 **Shape**를 **Ramp Up**으로 설정한 뒤, **Offset**에 -100 ~ 100 키프레임을 적용해보세요.
그리고 다른 하나는 해당 애니메이터를 복제한 뒤 **Shape**를 **Ramp Down**으로 설정합니다.
이후 앞서 설명한 **Transform / Random / Wiggle** 값을 원하는 방식으로 조절하면, 자연스럽게 나타나는 애니메이션과 사라지는 애니메이션을 손쉽게 만들 수 있습니다.
</topic>
`,
        faq:  updateText.ko + ``
    },
    ja: {
    quick: `テキストレイヤーのための新しい **テキストレンダラーエフェクト** です。
After Effects標準のテキストレイヤーが持つ最小単位である「文字（Character）」よりも細かい、グリフ（Glyph）単位でテキストを解析・レンダリングします。
また、独自のテキストアニメーターとIDベースの変形システムを搭載しており、Stardust / Plexus のようにエフェクトを重ねて管理する構造を採用しています。
簡単な文字分解演出のためにテキストレイヤーをシェイプレイヤーへ変換する手間なく、
1つのテキストレイヤーだけで、よりクリーンかつ非破壊的なテキスト演出を行えます。
[[video:assets/text one/videos/텍스트 컬러 변경]]
Text Save によって内部的にIDをマッピングし、コントローラーエフェクトを使って自由に演出できます。
[[video:assets/text one/videos/텍스트 변형]]
カラー変更だけでなく、基本的な変形にも対応しています。
[[video:assets/text one/videos/텍스트 애니메이터]]
独自のテキストアニメーターを搭載しています。
エフェクトベースで設計されたテキストアニメーター構造により、従来とは異なる表現が可能です。
**After Effects** テキストアニメーター → エフェクト適用
**Text One** エフェクト適用 → テキストアニメーター
この構造的な違いにより、Text One ではエフェクトが適用された最終結果そのものにアニメーションを適用でき、
従来の方法では難しかった演出を実現できます。
フラクタルノイズを適用した例です。
[[video:assets/text one/videos/차이점 설명]]
エフェクトの結果を基準に動作するテキストアニメーターです。

詳しい使い方については各パラメータの説明をご確認ください。
`,
    params: commonParamsText.ja + `
[[toggle-image パラメータ表示:assets/text one/images/파라미터]]
<topic open "Text Save">
**Text Save は After Effects の制限を可能な限り回避するために設計された機能です。**
すべての値は Save ボタンを押した瞬間にのみ反映されます。
Text Sorting は、分解されたストロークへIDをマッピングする基準を設定します。
例えば Left に設定すると、左から右の順番でIDが割り当てられます。
エフェクトが適用されたテキストの形状や視線の流れに合わせて、適切な順序を選択することをおすすめします。
マッピングされたIDは、コントローラーおよびテキストアニメーターのアニメーション順序に影響します。
None は After Effects が提供するデフォルト順です。
**Controller Add** でコントローラーを追加できます。
**Animater Add** でアニメーターを追加できます。
</topic>
<topic open "Controller">
**Start ID** と **End ID** によって、コントローラーが制御するグリフ（Glyph）の範囲を指定できます。
各コントローラーでは *Color* と *Transform* の設定が可能です。
また、エフェクトを重ねて同じ *ID* 範囲が重複した場合、
エフェクトパネル内でより下に配置された *Controller* が優先され、上書きされます。
</topic>
<topic open "Animater">
独自のテキストアニメーターを搭載しており、After Effects 標準のテキストアニメーターに近い感覚で使用できます。
**Start** と **End** によって適用範囲を指定し、
その範囲内で **Transform / Random / Wiggle** を適用してみてください。
[[video:assets/text one/videos/바운스]]
**Interpolation** によって動きのスピード感を調整できます。
バウンス機能もあり、**Bounce Frequency** と **Bounce Decay** によってバウンスの挙動を調整できます。
[[video:assets/text one/videos/센터 오더]]
**Order** によってアニメーション順序を設定できます。
**Center** を使うことで、中央から始まるアニメーションも作成できます。
[[video:assets/text one/videos/택스트 애니메이션 예시 1]]
基本的な使い方は After Effects のテキストアニメーターとほぼ同じです。
例えば、テキストアニメーターを2つ使用し、
片方の **Shape** を **Ramp Up** に設定した後、**Offset** に -100 ～ 100 のキーフレームを設定してください。
そしてもう片方はそのアニメーターを複製し、**Shape** を **Ramp Down** に設定します。
その後、前述した **Transform / Random / Wiggle** の値を好みに合わせて調整することで、
自然に現れるアニメーションと消えていくアニメーションを簡単に作成できます。
</topic>
`,
    faq: updateText.ja + ``
},

en: {
    quick: `A new **text renderer effect** for text layers.
Instead of relying on the default minimum unit of traditional After Effects text layers — the Character — this effect analyzes and renders text at a more detailed Glyph level.
It also provides its own text animator and ID-based transformation system, using a layered workflow similar to Stardust / Plexus.
Create clean, non-destructive text animations without the tedious process of converting text layers into shape layers for simple text decomposition effects.
[[video:assets/text one/videos/텍스트 컬러 변경]]
Use Text Save to internally map IDs, then freely control and stylize the result through controller effects.
[[video:assets/text one/videos/텍스트 변형]]
In addition to color adjustments, basic transformations are also supported.
[[video:assets/text one/videos/텍스트 애니메이터]]
The effect includes its own built-in text animator.
Its effect-based text animator structure enables expressions and workflows that differ from traditional approaches.
**After Effects** Text Animator → Apply Effects
**Text One** Apply Effects → Text Animator
Because of this structural difference, Text One can animate the final processed result itself,
making it possible to achieve effects that are difficult with the traditional workflow.
This is an example using Fractal Noise.
[[video:assets/text one/videos/차이점 설명]]
A text animator that operates based on the final effect result.

For detailed usage instructions, please refer to the description of each parameter.
`,
    params: commonParamsText.en + `
[[toggle-image View Parameters:assets/text one/images/파라미터]]
<topic open "Text Save">
**Text Save is a feature designed to bypass the limitations of After Effects as much as possible.**
All values are applied only at the moment the Save button is pressed.
Text Sorting determines how IDs are mapped to the separated strokes.
For example, if set to Left, IDs will be assigned from left to right.
It is recommended to choose a sorting order that matches the visual flow and shape of the processed text.
The mapped IDs affect the animation order of both Controllers and Text Animators.
None uses the default ordering provided by After Effects.
Use **Controller Add** to add a controller.
Use **Animater Add** to add an animator.
</topic>
<topic open "Controller">
You can define the glyph range controlled by the controller using **Start ID** and **End ID**.
Each controller supports both *Color* and *Transform* settings.
If multiple effects overlap within the same *ID* range,
the *Controller* placed lower in the Effect Panel will take priority and overwrite the previous result.
</topic>
<topic open "Animater">
The effect includes its own built-in text animator, designed to work similarly to the default After Effects text animator.
Use **Start** and **End** to define the active range,
then apply **Transform / Random / Wiggle** effects within that range.
[[video:assets/text one/videos/바운스]]
Use **Interpolation** to control the motion feel and speed curve.
Bounce is also supported, and you can customize its behavior using **Bounce Frequency** and **Bounce Decay**.
[[video:assets/text one/videos/센터 오더]]
Use **Order** to define the animation order.
With **Center**, you can create animations that begin from the middle.
[[video:assets/text one/videos/택스트 애니메이션 예시 1]]
The overall workflow is very similar to the default After Effects text animator.
For example, create two text animators.
Set the **Shape** of one animator to **Ramp Up**, then animate the **Offset** from -100 to 100 using keyframes.
Duplicate that animator and set the duplicated animator’s **Shape** to **Ramp Down**.
Then adjust the previously mentioned **Transform / Random / Wiggle** values as desired to easily create natural appearing and disappearing text animations.
</topic>
`,
    faq: updateText.en + ``
}
};

const MotionPathStrokeLog = {
    ko: {
        quick: `완벽한 곡선과 간단한 조작감을 구현하기 위해 **동작 패스를 사용하여 스트로크를 생성**하는 효과입니다.
After Effects의 ***Mask Path*** 같은 기능은 3D의 z축 옵션을 제공하지 않아 별도의 다른 플러그인은 z축을 파라미터 등의 방식으로 관리합니다.
하지만 이런 방식은 조작감이 편하다고는 할 수 없는 방식이기 때문에 그걸 보완한 이 효과는 지정된 레이어의 동작 패스를 가져와서 작동합니다.
동작 패스는 3D 적으로 조작할 수 있기 때문에 깔끔한 조작감으로 다룰 수 있습니다.
[[video:assets/motion path stroke/videos/3D조작]]
Null 레이어를 지정하여 Position에 keyFrame 를 생성하는 걸로 스트로크가 생성됩니다.
[[video:assets/motion path stroke/videos/Sampling Point]]
작동방식은 간단합니다. 레이어의 Start Point에서 End Point 까지 Sampling Point 만큼 나눠서 Position를 가져와 스트로크를 생성합니다.
다음과 같은 작동방식 이기때문에 레이어의 Start Point 와 End Point를 레이어의 KeyFreame에 딱 맞게 지속시간을 설정해주세요.
[[video:assets/motion path stroke/videos/단색 텍스쳐 매핑]]
원하는 색의 단색를 설정하거나 텍스쳐를 매핑할 수 있습니다.
자세한 사용 방법은 각 파라미터 설명을 참고해주세요.
`,
        params: commonParamsText.ko + `
<topic open "Motion Path Stroke">
**메인 효과 입니다. 이 효과안의 모든 파라미터는 모든 스트로크에 작동합니다.**
**Stroke** 스트로크의 굵기를 커브로 세세하게 제어할 수 있습니다.
<topic open "Transform">
**Controller Layer**에 Null레이어를 지정하여 After Effects의 레이어 변형을 그대로 가져올 수 있습니다.
</topic>
<topic "Twist">
**Twist** 수치만큼 선을 꼬아줍니다.
[[video:assets/motion path stroke/videos/Twist]]
</topic>
<topic "Wave">
**length** 의 간격으로 **Amplitude** 수치의 강도만큼 스트로크가 움직입니다. Offset를 통해서 애니메이션을 줄 수 있습니다.
[[video:assets/motion path stroke/videos/Wave]]
</topic>
<topic "Noize">
**Noize**는 **Wave** 하고 다르게 3D에 스트로크 위치를 기반으로 무작위적인 노이즈로 스트로크를 휘게 합니다.
</topic>
<topic open "Camera">
3D 기능을 사용하려면 **Camera Mode**를 **AE Camera**로 설정해야 합니다.
카메라 레이어가 생성되어 있지 않으면 3D 공간이 정확하게 계산되지 안습니다, 카메라 레이어를 생성한 상태에서 사용해 주세요.
<topic "Occlusion">
**콜랩스(해 아이콘) 레이어 전용입니다.**
레이어를 지정만 하면 Z축에 따라서 클리핑이 되게 설정되었습니다.
간단한 방식을 위해서 정확도는 살짝 포기했습니다. 과도한 카메라 회전이나 지정한 레이어하고 너무 가까운 스트로크에서는 정확하지 않게 작동할 수 있습니다.
**Occlusion** 기능을 사용하기위해서는 지정한 레이어가 효과를 적용한 단색레이어보다 밑에 있어야하며 카메라 레이어가 생성되어
있어야합니다.
[[video:assets/motion path stroke/videos/오클루젼 1]]
Text Layer와 Shape Layer는 기본적으로 콜랩스 레이어이므로 레이어를 지정하는 것만으로 사용할 수 있습니다.
Footage Layer는 아래와 같은 방법으로 콜랩스 레이어로 만들어 사용할 수 있습니다.
1. Footage Layer를 프리컴포지션한 후, 프리컴포지션 내부의 레이어를 3D 레이어로 활성화합니다. (내부 레이어의 Z축 값은 변경하지 않고 0으로 유지합니다.)
2. 프리컴포지션 레이어의 콜랩스 기능과 3D 기능을 활성화합니다.
3. 프리컴포지션 레이어의 Z축 값을 조절하여 사용합니다.
[[video:assets/motion path stroke/videos/오클루젼 2]]
</topic>
</topic>
</topic>
<topic open "Path Controller">
**개별적인 스트로크의 대한 컨트롤러 효과입니다.**
**Motion Path Layer**에 Null레이어를 지정하고 Position의 KerFrame를 사용하여 움직임을 줘보세요
그러면 **Sampling Point** 레이어의 지속시간을 수치만큼 쪼개서 위치를 샘플링합니다.
**Stokre** 스트로크의 굵기를 제어합니다.
**Offset** 텍스쳐의 오프셋 입니다.
<topic "Trimming">
**Start & End** 스트로크의 시작과 끝을 자릅니다.
**Start Feather & End Feather** 스트로크의 잘라진 스트로크의 페더입니다.
**Strart 0%**
**End 10%**
**End Feather 10%**
다음과 같은 수치라면 0~10% 부분이 보여지고 10~20% 구간이 Feather로 서서히 보여집니다.
F가 붙여진 파라미터는 Fixed 를 뜻합니다 **Offset**하고 상관없이 전체 Path 경로를 기준으로 합니다.
</topic>
<topic "Taper">
**Start & End** 스트로크의 끝부분을 날카롭게 합니다.
</topic>
**Color Mode** 스트로크에 대한 컬러 모드입니다.
Color와 Texture두가지 모드를 제공하며 Gradient는 자체적인 기능으로 없지만
Texture 매핑 기능을 활용하여 Gradine를 매핑하여 사용할 수 있습니다.
<topic "Texture">
**Texture** 텍스쳐 레이어를 지정하여 스트로크에 매핑합니다.
**Length** 텍스쳐 한 타일의 길이를 설정합니다. 스트로크 길이가 **Length**보다 길 경우 텍스쳐가 반복되어 표시됩니다.
**Normalized** 텍스쳐를 스트로크 전체 길이에 맞게 자동으로 늘리거나 축소하여 매핑합니다. **Length** 수치는 무시됩니다.
**UV Scale X** 텍스쳐의 UV 크기를 조절합니다. **Normalized**된 텍스쳐를 **50%**로 설정하면 2번 **25%**로 설정하면 4번 반복됩니다.
**Tiling Mode** 텍스쳐가 반복될때마다 처리되는 방식을 정합니다.
[[video:assets/motion path stroke/videos/텍스쳐 매핑]]
텍스쳐 매핑에 대한 개수 제한이나 그런거는 없습니다. 무한한 상상력으로 여러 연출을 만들어보세요!
</topic>
<topic "Repeater">
**Instances** 반복되는 개수입니다.
**Opacity Decrement**는 반복되는 횟수 마다 감소하는 Opacity입니다.
만약 20% 라면 100% 80% 60% 40% 20% 순으로 감소합니다.
**Repater**가 너무 반복되는 느낌을 준다면 **Radnom** 기능을 사용하여 바리에이션을 줘보세요
[[video:assets/motion path stroke/videos/리피터]]
</topic>
</topic>

`,
        faq:  updateText.ko + ``
    },
 ja: {
    quick: `完璧なカーブとシンプルな操作性を実現するために、**モーションパスを利用してストロークを生成するエフェクト**です。
After Effects の ***Mask Path*** のような機能は 3D の Z 軸情報を持たないため、多くのプラグインでは Z 軸をパラメータなどで管理しています。
しかし、その方法は必ずしも直感的とは言えません。
このエフェクトはその問題を補うため、指定したレイヤーのモーションパスを取得してストロークを生成します。
モーションパスは 3D 空間上で直接編集できるため、より自然で分かりやすい操作が可能です。
[[video:assets/motion path stroke/videos/3D조작]]
Null レイヤーを指定し、Position にキーフレームを設定するだけでストロークが生成されます。
[[video:assets/motion path stroke/videos/Sampling Point]]
動作は非常にシンプルです。
レイヤーの Start Point から End Point までを Sampling Point の数だけ分割し、それぞれの Position を取得してストロークを生成します。
この仕組みのため、レイヤーの Start Point と End Point がキーフレームのタイミングに合うようにレイヤーの長さを設定してください。
[[video:assets/motion path stroke/videos/단색 텍스쳐 매핑]]
単色カラーを使用することも、テクスチャをマッピングすることもできます。
詳しい使用方法については各パラメータの説明をご確認ください。
`,

    params: commonParamsText.ja + `
<topic open "Motion Path Stroke">
**メインエフェクトです。このエフェクト内のすべてのパラメータは、すべてのストロークに適用されます。**
**Stroke** ストロークの太さをカーブで細かく制御できます。
<topic open "Transform">
**Controller Layer** に Null レイヤーを指定すると、After Effects のレイヤートランスフォームをそのまま取得できます。
</topic>
<topic "Twist">
**Twist** の値だけストロークをねじります。
[[video:assets/motion path stroke/videos/Twist]]
</topic>
<topic "Wave">
**Length** 間隔ごとに **Amplitude** の強さでストロークを変形します。
**Offset** をアニメーションさせることで動きを付けることができます。
[[video:assets/motion path stroke/videos/Wave]]
</topic>
<topic "Noise">
**Noise** は **Wave** と異なり、3D 空間上のストローク位置を基準にランダムなノイズでストロークを変形します。
</topic>
<topic open "Camera">
3D 機能を使用するには **Camera Mode** を **AE Camera** に設定する必要があります。
カメラレイヤーが存在しない場合、3D 空間の計算が正しく行われません。
必ずカメラレイヤーを作成した状態で使用してください。
<topic "Occlusion">
**コラプス（太陽アイコン）レイヤー専用機能です。**
レイヤーを指定するだけで、Z 軸に基づいたクリッピングが行われます。
簡単な仕組みを優先しているため、精度は多少犠牲にしています。
極端なカメラ回転や、指定レイヤーに非常に近いストロークでは正確に動作しない場合があります。
**Occlusion** を使用するには、指定したレイヤーがエフェクトを適用したソリッドレイヤーより下に配置されており、カメラレイヤーが作成されている必要があります。
[[video:assets/motion path stroke/videos/오클루젼 1]]
Text Layer と Shape Layer は基本的にコラプス（連続ラスタライズ）レイヤーのため、レイヤーを指定するだけで使用できます。
Footage Layer は以下の方法でコラプスレイヤー化して使用できます。
1. Footage Layer をプリコンポーズし、プリコンポジション内のレイヤーを 3D レイヤーとして有効にします。（内部レイヤーの Z 値は変更せず 0 のままにしてください。）
2. プリコンポジションレイヤーのコラプス（連続ラスタライズ）と 3D を有効にします。
3. プリコンポジションレイヤーの Z 値を調整して使用します。
[[video:assets/motion path stroke/videos/오클루젼 2]]
</topic>
</topic>
</topic>
<topic open "Path Controller">
**各ストロークを個別に制御するためのコントローラーエフェクトです。**
**Motion Path Layer** に Null レイヤーを指定し、Position にキーフレームを設定して動かしてください。
すると **Sampling Point** の数だけレイヤーの時間を分割し、それぞれの位置をサンプリングします。
**Stroke** ストロークの太さを制御します。
**Offset** テクスチャのオフセットです。
<topic "Trimming">
**Start & End** ストロークの開始位置と終了位置をトリミングします。
**Start Feather & End Feather** トリミングされた部分のフェザーです。
**Start 0%**
**End 10%**
**End Feather 10%**
この場合、0〜10% の範囲が表示され、10〜20% の範囲がフェザーとして徐々に表示されます。
F が付いたパラメータは Fixed を意味します。
**Offset** の影響を受けず、常にパス全体を基準として計算されます。
</topic>
<topic "Taper">
**Start & End** ストロークの端を尖らせます。
</topic>
**Color Mode** ストロークのカラー設定です。
Color と Texture の 2 つのモードがあります。
専用の Gradient モードはありませんが、テクスチャを利用してグラデーションをマッピングすることができます。
<topic "Texture">
**Texture** テクスチャレイヤーをストロークにマッピングします。
**Length** テクスチャ 1 タイル分の長さを設定します。
ストロークの長さが **Length** より長い場合、テクスチャが繰り返されます。
**Normalized** テクスチャをストローク全体の長さに合わせて自動的に拡大・縮小してマッピングします。
この場合 **Length** の値は無視されます。
**UV Scale X** テクスチャの UV スケールを調整します。
**Normalized** が有効な状態で **50%** に設定すると 2 回、**25%** に設定すると 4 回繰り返されます。
**Tiling Mode** テクスチャが繰り返される際の処理方法を設定します。
[[video:assets/motion path stroke/videos/텍스쳐 매핑]]
テクスチャマッピングには数の制限などはありません。
自由な発想でさまざまな演出を作ってみてください！
</topic>
<topic "Repeater">
**Instances** 繰り返し数を設定します。
**Opacity Decrement** は繰り返されるごとに減少する不透明度です。
例えば 20% に設定すると、
100% → 80% → 60% → 40% → 20%
のように減少します。
**Repeater** の繰り返し感が強すぎる場合は、**Random** 機能を使用してバリエーションを付けてみてください。
[[video:assets/motion path stroke/videos/리피터]]
</topic>
</topic>
`,
    faq: updateText.ja + ``
},

en: {
    quick: `An effect that **generates strokes using motion paths**, designed to provide smooth curves and intuitive controls.
After Effects ***Mask Path*** does not contain 3D Z-axis information, so many similar plugins require users to manage depth through separate parameters.
While functional, that workflow is not always intuitive.
To solve this problem, this effect generates strokes by sampling the motion path of a specified layer.
Because motion paths can be edited directly in 3D space, they provide a much cleaner and more natural workflow.
[[video:assets/motion path stroke/videos/3D조작]]
Simply assign a Null layer and animate its Position with keyframes to generate a stroke.
[[video:assets/motion path stroke/videos/Sampling Point]]
The principle is straightforward.
The effect samples positions between the layer's Start Point and End Point according to the Sampling Point value, then generates a stroke from those sampled positions.
Because of this workflow, it is recommended to set the layer duration so that the Start Point and End Point align with the desired keyframe range.
[[video:assets/motion path stroke/videos/단색 텍스쳐 매핑]]
You can use either a solid color or map a texture onto the stroke.
For detailed usage instructions, please refer to the description of each parameter.
`,

    params: commonParamsText.en + `
<topic open "Motion Path Stroke">
**This is the main effect. All parameters inside this effect are applied to every stroke.**
**Stroke** Allows precise control over stroke thickness using a curve.
<topic open "Transform">
Assign a Null layer to **Controller Layer** to use the layer's native After Effects transforms.
</topic>
<topic "Twist">
**Twist** Twists the stroke by the specified amount.
[[video:assets/motion path stroke/videos/Twist]]
</topic>
<topic "Wave">
The stroke is displaced by the specified **Amplitude** at intervals defined by **Length**.
Animate **Offset** to create motion.
[[video:assets/motion path stroke/videos/Wave]]
</topic>
<topic "Noise">
Unlike **Wave**, **Noise** bends the stroke using random noise based on its position in 3D space.
</topic>
<topic open "Camera">
To use 3D features, **Camera Mode** must be set to **AE Camera**.
If no camera layer exists, the 3D space cannot be calculated correctly.
Please create a camera layer before using this mode.
<topic "Occlusion">
**Only supported on Collapse Transformation (Sun Icon) layers.**
Simply assign a layer to enable Z-based clipping.
To keep the setup simple, some accuracy has been sacrificed.
Results may become inaccurate with extreme camera rotations or when strokes are very close to the assigned layer.
To use **Occlusion**, the assigned layer must be placed below the Solid Layer that has the effect applied, and a Camera Layer must exist in the composition.
[[video:assets/motion path stroke/videos/오클루젼 1]]
Text Layers and Shape Layers are effectively Collapse Transformation layers by default, so they can be used simply by assigning the layer.
Footage Layers can be converted into Collapse Transformation layers using the following workflow:
1. Pre-compose the Footage Layer, then enable 3D for the layer inside the pre-composition. (Keep the internal layer's Z position at 0.)
2. Enable both **Collapse Transformations** and **3D Layer** for the pre-composition layer.
3. Adjust the Z position of the pre-composition layer as needed.
[[video:assets/motion path stroke/videos/오클루젼 2]]
</topic>
</topic>
</topic>
<topic open "Path Controller">
**A controller effect used to adjust individual strokes.**
Assign a Null layer to **Motion Path Layer** and animate its Position with keyframes.
The effect samples positions by dividing the layer duration according to the **Sampling Point** value.
**Stroke** Controls the thickness of the stroke.
**Offset** Controls the texture offset.
<topic "Trimming">
**Start & End** Trim the beginning and end of the stroke.
**Start Feather & End Feather** Control the feathering of the trimmed region.
**Start 0%**
**End 10%**
**End Feather 10%**
With these settings, the 0–10% section is visible, while the 10–20% section gradually fades in using feathering.
Parameters marked with **F** mean **Fixed**.
They are calculated using the entire path as a reference and are not affected by **Offset**.
</topic>
<topic "Taper">
**Start & End** Create sharp tapered ends on the stroke.
</topic>
**Color Mode** Defines the stroke coloring method.
Both **Color** and **Texture** modes are available.
A dedicated Gradient mode is not included, but gradients can be mapped using a texture.
<topic "Texture">
**Texture** Assigns a texture layer to the stroke.
**Length** Defines the length of a single texture tile.
If the stroke is longer than **Length**, the texture repeats.
**Normalized** Automatically stretches or compresses the texture to fit the entire stroke length.
When enabled, **Length** is ignored.
**UV Scale X** Adjusts the horizontal UV scale of the texture.
With **Normalized** enabled, setting it to **50%** repeats the texture twice, and **25%** repeats it four times.
**Tiling Mode** Determines how the texture behaves when it repeats.
[[video:assets/motion path stroke/videos/텍스쳐 매핑]]
There is no practical limit to the number of texture mappings you can create.
Use your imagination and experiment with different visual styles and effects!
</topic>

<topic "Repeater">
**Instances** Defines the number of repeated copies.
**Opacity Decrement** Controls how much opacity decreases for each repeated instance.
For example, if set to 20%, the opacity will decrease as:
100% → 80% → 60% → 40% → 20%
If the result feels too repetitive, try using the **Random** feature to add variation.
[[video:assets/motion path stroke/videos/리피터]]
</topic>
</topic>
`,
    faq: updateText.en + ``
},
};







const pluginLogs = {
    "smart-stroke": smartStrokeLog,
    "path-repeater": pathRepeaterLog,
    "boundary-fill": boundaryFillLog,
    "text-one": textOneLog,
    "motion-path-stroke": MotionPathStrokeLog
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

