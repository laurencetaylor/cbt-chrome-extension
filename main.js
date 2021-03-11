const distortionDetails = {
    ALL_OR_NOTHING: {
        name: 'All Or Nothing Thinking',
        description:
            "You evaluate things in extreme, black or white categories. You might find yourself using words like 'always', 'every', and 'never'. This is the basis for perfectionism.",
        example:
            'Life is rarely entirely one way or the other, but shades of gray. By forcing your experiences into absolute categories you are less likely to be satisfied.',
    },
    OVERGENERALIZATION: {
        name: 'Overgeneralization',
        description:
            'When something occurs once, for example rejection, you conclude it will happen over and over again.',
        example:
            'Just because you experience a bad outcome once doesn’t mean there will be bad outcomes every time you try something.',
    },
    MENTAL_FILTER: {
        name: 'Mental Filter',
        description:
            "Taking one small negative event or detail in a situation and dwelling on it, filtering out anything positive like you're wearing a pair of (unhelpful) sunglasses.",
        example:
            'There are always positives and silver linings in situations. It can help to pay them special attention',
    },
    DISQUALIFY_THE_POSITIVE: {
        name: 'Disqualify The Positive',
        description:
            'Invalidating neutral or positive experiences so they are transformed into negative ones. For example, responding to a compliment with "they\'re just being nice".',
        example: "Try to avoid throwing cold water on good things when they happen. Embrace them and their richness.",
    },
    MIND_READING: {
        name: 'Mind Reading',
        description:
            'Assuming arbitrarily that other people are looking down on you.',
        example: 'People have a lot going on in their lives. Behaviors you perceive as an affront are likely unrelated to your actions or personality.',
    },
    FORTUNE_TELLING: {
        name: 'Fortune Telling',
        description: 'Imagining arbitrarily that something bad is about to happen. Making negative predictions with no evidence behind them.',
        example: '',
    },
    MAGNIFICATION: {
        name: 'Magnification',
        description:
            'Exaggerating your errors, fears, and imperfections; catastrophising',
        example: '',
    },
    MINIMIZATION: {
        name: 'Minimization',
        description:
            'Glossing over your desirable qualities as well as the flaws of others',
        example: '',
    },
    EMOTIONAL_REASONING: {
        name: 'Emotional Reasoning',
        description: 'Taking emotions as evidence for the truth',
        example: '',
    },
    SHOULD_STATEMENTS: {
        name: 'Should Statements',
        description:
            "Making yourself feel terrible by saying 'I should' do this or that",
        example: '',
    },
    MISLABELLING: {
        name: 'Mislabelling',
        description:
            'Describing events with words that are inaccurate and emotionally heavily loaded',
        example: '',
    },
    PERSONALIZATION: {
        name: 'Personalization',
        description:
            'Assuming responsibility for negative events where there is no basis for doing so',
        example: '',
    },
};

const getRandomDistortionKey = () => {
    const distortionKeys = Object.keys(distortionDetails);
    const randomDistortionKey =
        distortionKeys[Math.floor(Math.random() * distortionKeys.length)];

    return randomDistortionKey;
};

// Controller
const fillDistortionDetails = (distortionKey) => {
    const { name, description, example } = distortionDetails[distortionKey];

    const distortionNameElement = document.querySelector('.distortion-name');
    const distortionDescriptionElement = document.querySelector(
        '.distortion-description'
    );
    const distortionExampleElement = document.querySelector(
        '.distortion-example'
    );

    distortionNameElement.innerHTML = name;
    distortionDescriptionElement.innerHTML = description;
    distortionExampleElement.innerHTML = example;
};

const highlightDistortion = (distortionKey) => {
    const selectedDistortion = document.querySelector(`.${distortionKey}`);
    selectedDistortion.style.color = '#cb9d06';
};

const unhighlightDistortion = (distortionKey) => {
    const distortion = document.querySelector(`.${distortionKey}`);
    distortion.style.color = 'black';
};

const setLeafSvg = () => {
    const svgPlaceholder = document.querySelector('.leaf-image');
    const randomNumber = Math.floor(Math.random() * 5);
    svgPlaceholder.setAttribute('data', `plant-${randomNumber}.svg`);
};

let currentDistortionKey = getRandomDistortionKey();

const fillDistortionList = () => {
    const distortionUlElement = document.querySelector('.distortion-list');

    Object.keys(distortionDetails).forEach((distortionKey) => {
        const liElement = document.createElement('li');
        liElement.setAttribute('class', distortionKey);

        const distortionName = distortionDetails[distortionKey].name;

        liElement.innerHTML = distortionName;

        liElement.addEventListener('click', (event) => {
            unhighlightDistortion(currentDistortionKey);

            currentDistortionKey = event.target.className;

            fillDistortionDetails(currentDistortionKey);
            highlightDistortion(currentDistortionKey);
        });

        distortionUlElement.appendChild(liElement);
    });
};

window.onload = () => {
    fillDistortionList();

    fillDistortionDetails(currentDistortionKey);
    highlightDistortion(currentDistortionKey);

    setLeafSvg();
};
