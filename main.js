// CONSTANTS
const DISTORTION_DETAILS = {
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

const HIGHLIGHT_COLOR = '#cb9d06';
const DARK_MODE_TEXT_COLOR = 'white';
const LIGHT_MODE_TEXT_COLOR = 'black';
const DARK_MODE_TEXT = 'Dark mode';
const LIGHT_MODE_TEXT = 'Light mode';
const DARK_MODE_LOCAL_STORAGE = 'undistort-dark-mode';
const DARK_SVG_SUFFIX = ':dark';
const LIGHT_SVG_SUFFIX = ':light';

// CLASS SELECTORS
const DISTORTION_NAME_CLASS = '.distortion-name';
const DISTORTION_DESCRIPTION_CLASS = '.distortion-description';
const DISTORTION_EXAMPLE_CLASS = '.distortion-example';
const DISTORTION_LIST_CLASS = '.distortion-list';
const DARK_MODE_TOGGLE_CLASS = '.dark-mode-toggle';
const LEAF_SVG_CLASS = '.leaf-svg';
const DARK_MODE_CLASS_NAME = 'dark-mode';

// STATE
const getRandomDistortionKey = () => {
    const distortionKeys = Object.keys(DISTORTION_DETAILS);
    const randomDistortionKey =
        distortionKeys[Math.floor(Math.random() * distortionKeys.length)];

    return randomDistortionKey;
};

const _state = {
    currentDistortionKey: getRandomDistortionKey(),
};

const setCurrentDistortionKey = (newDistortionKey) => {
    _state.currentDistortionKey = newDistortionKey;
};
const getCurrentDistortionKey = () => _state.currentDistortionKey;

const setIsDarkMode = (isDarkMode) =>
    window.localStorage.setItem(DARK_MODE_LOCAL_STORAGE, isDarkMode);
const getIsDarkMode = () =>
    JSON.parse(window.localStorage.getItem(DARK_MODE_LOCAL_STORAGE)) ?? false;

// CONTROLLER
const renderLeafSvg = () => {
    const NUMBER_OF_SVGS = 5;

    const leafSvgElement = document.querySelector(LEAF_SVG_CLASS);

    const randomNumber = Math.floor(Math.random() * NUMBER_OF_SVGS);
    const darkModeSuffix = getIsDarkMode() ? DARK_SVG_SUFFIX : LIGHT_SVG_SUFFIX;

    leafSvgElement.setAttribute(
        'data',
        `./assets/plant-${randomNumber}${darkModeSuffix}.svg`
    );
};

const renderDistortionDetails = (distortionKey) => {
    const { name, description, example } = DISTORTION_DETAILS[distortionKey];

    const classNameToContentMap = {
        [DISTORTION_NAME_CLASS]: name,
        [DISTORTION_DESCRIPTION_CLASS]: description,
        [DISTORTION_EXAMPLE_CLASS]: example,
    };

    Object.entries(classNameToContentMap).forEach(([className, content]) => {
        const element = document.querySelector(className);

        element.innerHTML = content;
    });
};

const highlightDistortionName = (distortionKey) => {
    const distortionElement = document.querySelector(`.${distortionKey}`);

    distortionElement.style.color = HIGHLIGHT_COLOR;
};

const unhighlightDistortionName = (distortionKey) => {
    const distortionElement = document.querySelector(`.${distortionKey}`);

    distortionElement.style.color = getIsDarkMode()
        ? DARK_MODE_TEXT_COLOR
        : LIGHT_MODE_TEXT_COLOR;
};

const changeSelectedDistortion = (newDistortionKey) => {
    unhighlightDistortionName(getCurrentDistortionKey());

    renderDistortionDetails(newDistortionKey);
    highlightDistortionName(newDistortionKey);

    setCurrentDistortionKey(newDistortionKey);
};

const renderDistortionListItem = (distortionKey, distortionListContainer) => {
    const listItemElement = document.createElement('li');

    if (distortionKey === getCurrentDistortionKey()) {
        listItemElement.style.color = HIGHLIGHT_COLOR;
    }

    const distortionName = DISTORTION_DETAILS[distortionKey].name;

    const attributeToValueMap = {
        class: distortionKey,
        tabindex: 0,
        'aria-label': `Select ${distortionName}`,
        role: 'button',
    };

    Object.entries(attributeToValueMap).forEach(([attribute, value]) =>
        listItemElement.setAttribute(attribute, value)
    );

    listItemElement.innerHTML = distortionName;

    listItemElement.addEventListener('click', (event) => {
        changeSelectedDistortion(event.target.className);
    });

    listItemElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            changeSelectedDistortion(event.target.className);
        }
    });

    distortionListContainer.appendChild(listItemElement);
};

const renderDistortionList = () => {
    const distortionListElement = document.querySelector(DISTORTION_LIST_CLASS);

    distortionListElement.innerHTML = null;

    Object.keys(DISTORTION_DETAILS).forEach((distortionKey) => {
        renderDistortionListItem(distortionKey, distortionListElement);
    });
};

const toggleDarkMode = (darkModeToggle) => {
    const newIsDarkMode = !getIsDarkMode();

    darkModeToggle.innerHTML = newIsDarkMode ? LIGHT_MODE_TEXT : DARK_MODE_TEXT;

    const leafSvgElement = document.querySelector(LEAF_SVG_CLASS);

    const data = leafSvgElement.getAttribute('data');
    const newData =
        data.split(':')[0] +
        `${newIsDarkMode ? DARK_SVG_SUFFIX : LIGHT_SVG_SUFFIX}.svg`;

    leafSvgElement.setAttribute('data', newData);

    newIsDarkMode
        ? document.body.classList.add(DARK_MODE_CLASS_NAME)
        : document.body.classList.remove(DARK_MODE_CLASS_NAME);

    setIsDarkMode(newIsDarkMode);
    renderDistortionList();
};

const renderDarkModeToggle = () => {
    const darkModeToggleElement = document.querySelector(
        DARK_MODE_TOGGLE_CLASS
    );

    darkModeToggleElement.innerHTML = getIsDarkMode()
        ? LIGHT_MODE_TEXT
        : DARK_MODE_TEXT;

    darkModeToggleElement.addEventListener('click', () =>
        toggleDarkMode(darkModeToggleElement)
    );

    darkModeToggleElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            toggleDarkMode(darkModeToggleElement);
        }
    });
};

// ONLOAD
const renderTab = () => {
    if (getIsDarkMode()) {
        document.body.classList.add(DARK_MODE_CLASS_NAME);
    }

    renderDistortionList();
    renderDistortionDetails(getCurrentDistortionKey());
    renderDarkModeToggle();
    renderLeafSvg();
};

window.onload = renderTab;
