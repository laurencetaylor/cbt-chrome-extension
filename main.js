// LIST OF MENTAL DISTORTIONS
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
            "Taking one small negative event or detail in a situation and dwelling on it, filtering out anything positive as if you're wearing a pair of (unhelpful) sunglasses.",
        example:
            'There are always positives and silver linings in situations. It can help to pay them special attention.',
    },
    DISQUALIFY_THE_POSITIVE: {
        name: 'Disqualify The Positive',
        description:
            'Invalidating neutral or positive experiences so they are transformed into negative ones. For example, responding to a compliment with "they\'re just being nice".',
        example:
            'Try to avoid throwing cold water on good things when they happen. Embrace them and their richness.',
    },
    MIND_READING: {
        name: 'Mind Reading',
        description:
            'Assuming that other people are looking down on you without any reason.',
        example:
            'People have a lot going on in their lives. Behaviors you perceive as an affront are likely unrelated to your actions or personality.',
    },
    FORTUNE_TELLING: {
        name: 'Fortune Telling',
        description:
            'Imagining that something bad is about to happen and making negative predictions without any evidence.',
        example:
            'Acknowledge the silliness of your predictions. Try to avoid baselessly imagining bad things happening.',
    },
    MAGNIFICATION: {
        name: 'Magnification',
        description:
            'Exaggerating your errors, fears, and imperfections and blowing things out of proportion.',
        example:
            'Making a mistake does not mean your life will spiral out of control. Have empathy for yourself.',
    },
    MINIMIZATION: {
        name: 'Minimization',
        description:
            'Minimizing your desirable qualities and strengths as well as the flaws of others.',
        example:
            'Be proud of your many good qualities. Accept that nobody is perfect.',
    },
    EMOTIONAL_REASONING: {
        name: 'Emotional Reasoning',
        description:
            'Taking emotions as evidence for the truth. You feel like a failure, therefore you must be a failure.',
        example:
            'Remember that negative emotions are not always based in reality, they are often the result of distorted perceptions.',
    },
    SHOULD_STATEMENTS: {
        name: 'Should Statements',
        description:
            "Making yourself feel terrible by saying 'I should' or 'I must' do this or that. Believing that other people 'should' behave in certain ways.",
        example:
            "Try replacing 'should' with 'it would be nice if'. Alternatively, your 'should' might not even be accurate or rooted in reality.",
    },
    MISLABELLING: {
        name: 'Mislabelling',
        description:
            'Describing events with words that are inaccurate and emotionally heavily loaded. For example, labelling yourself as a failure after one mistake.',
        example:
            'Remember the negative labels are overly-simplistic and wrong. Your entire complex self can never be associated with just one label.',
    },
    PERSONALIZATION: {
        name: 'Personalization',
        description:
            'Assuming responsibility for negative events when there is no basis for doing so.',
        example:
            'Just because something bad happens it does not mean that it is your fault.',
    },
};

const getRandomDistortionKey = () => {
    const distortionKeys = Object.keys(distortionDetails);
    const randomDistortionKey =
        distortionKeys[Math.floor(Math.random() * distortionKeys.length)];

    return randomDistortionKey;
};

const state = { _currentDistortionKey: getRandomDistortionKey() };

const setCurrentDistortionKey = (newDistortionKey) => {
    state._currentDistortionKey = newDistortionKey;
};

const getCurrentDistortionKey = () => state._currentDistortionKey;

const renderRandomLeafSvg = () => {
    const NUMBER_OF_SVGS = 5;

    const svgPlaceholder = document.querySelector('.leaf-svg');

    const randomNumber = Math.floor(Math.random() * NUMBER_OF_SVGS);

    svgPlaceholder.setAttribute('data', `plant-${randomNumber}.svg`);
};

const renderDistortionDetails = (distortionKey) => {
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

const highlightDistortionName = (distortionKey) => {
    const selectedDistortion = document.querySelector(`.${distortionKey}`);
    selectedDistortion.style.color = '#cb9d06';
};

const unhighlightDistortionName = (distortionKey) => {
    const distortion = document.querySelector(`.${distortionKey}`);
    distortion.style.color = 'black';
};

const changeSelectedDistortion = (newDistortionKey) => {
    unhighlightDistortionName(getCurrentDistortionKey());

    renderDistortionDetails(newDistortionKey);
    highlightDistortionName(newDistortionKey);

    setCurrentDistortionKey(newDistortionKey);
};

const renderDistortionListElement = (
    distortionKey,
    distortionListContainer
) => {
    const liElement = document.createElement('li');

    const distortionName = distortionDetails[distortionKey].name;

    liElement.setAttribute('class', distortionKey);
    liElement.setAttribute('tabindex', 0);
    liElement.setAttribute('aria-label', `Select ${distortionName}`);

    liElement.innerHTML = distortionName;

    liElement.addEventListener('click', (event) => {
        changeSelectedDistortion(event.target.className);
    });

    liElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            changeSelectedDistortion(event.target.className);
        }
    });

    distortionListContainer.appendChild(liElement);
};

const renderDistortionList = () => {
    const distortionListContainer = document.querySelector('.distortion-list');

    Object.keys(distortionDetails).forEach((distortionKey) => {
        renderDistortionListElement(distortionKey, distortionListContainer);
    });
};

// ONLOAD
window.onload = () => {
    renderDistortionList();

    const currentDistortionKey = getCurrentDistortionKey();

    renderDistortionDetails(currentDistortionKey);
    highlightDistortionName(currentDistortionKey);

    renderRandomLeafSvg();
};
