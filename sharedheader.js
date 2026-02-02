// shared-components.js - Common components for GameShack

// Shared CSS that all pages need
const sharedStyles = `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        background: #000000;
        color: #ffffff;
        overflow-x: hidden;
    }

    /* Spinning Banner */
    .banner-container {
        background: linear-gradient(135deg, #7dc3f5 0%, #f7a8bd 100%);
        padding: 15px 0;
        overflow: hidden;
        position: relative;
        box-shadow: 0 4px 20px rgba(125, 195, 245, 0.3);
    }

    .banner-track {
        display: flex;
        animation: scroll 20s linear infinite;
        width: fit-content;
    }

    .banner-text {
        font-size: 24px;
        font-weight: bold;
        color: #000000;
        white-space: nowrap;
        padding: 0 40px;
        text-transform: uppercase;
        letter-spacing: 2px;
    }

    @keyframes scroll {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-50%);
        }
    }

    /* Header */
    .header {
        background: rgba(0, 0, 0, 0.95);
        padding: 20px 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid #7dc3f5;
        position: sticky;
        top: 0;
        z-index: 100;
        backdrop-filter: blur(10px);
    }

    .logo {
        font-size: 32px;
        font-weight: bold;
        background: linear-gradient(135deg, #7dc3f5 0%, #f7a8bd 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        letter-spacing: 1px;
        text-decoration: none;
    }

    .wip {
        font-size: 12px;
        color: #888;
        font-weight: normal;
        margin-left: 10px;
    }

    .header-nav {
        display: flex;
        gap: 20px;
        align-items: center;
    }

    .nav-link {
        color: #7dc3f5;
        text-decoration: none;
        padding: 8px 16px;
        border-radius: 6px;
        transition: all 0.3s ease;
        font-weight: 500;
        border: 2px solid transparent;
        cursor: pointer;
    }

    .nav-link:hover {
        background: rgba(125, 195, 245, 0.1);
        border-color: #7dc3f5;
    }

    .nav-link.active {
        background: #7dc3f5;
        color: #000;
    }

    @media (max-width: 768px) {
        .header {
            padding: 15px 20px;
            flex-direction: column;
            gap: 15px;
        }
    }
`;

// SpinningBanner Component
function SpinningBanner({ username }) {
    const message = username ? `Hi ${username}!` : 'Welcome to GameShack!';
    const repeatedMessage = ` ${message} • `.repeat(15);

    return React.createElement('div', { className: 'banner-container' },
        React.createElement('div', { className: 'banner-track' },
            React.createElement('span', { className: 'banner-text' }, repeatedMessage),
            React.createElement('span', { className: 'banner-text' }, repeatedMessage)
        )
    );
}

// GameShackHeader Component
function GameShackHeader({ currentUser, activePage, onLogout, onShowAuth }) {
    return React.createElement('div', { className: 'header' },
        React.createElement('a', { href: 'gameshack.html', className: 'logo' },
            'GAMESHACK ',
            React.createElement('span', { className: 'wip' }, '(work in progress)')
        ),
        React.createElement('div', { className: 'header-nav' },
            React.createElement('a', {
                className: `nav-link ${activePage === 'home' ? 'active' : ''}`,
                href: 'gameshack.html'
            }, 'Home'),
            React.createElement('a', {
                className: `nav-link ${activePage === 'recents' ? 'active' : ''}`,
                href: 'recents.html'
            }, 'Recents'),
            React.createElement('a', {
                className: `nav-link ${activePage === 'games' ? 'active' : ''}`,
                href: 'games.html'
            }, 'Games'),
            currentUser ?
                React.createElement('a', {
                    className: 'nav-link',
                    onClick: onLogout,
                    href: onLogout ? undefined : 'login.html'
                }, 'Logout')
                :
                React.createElement(React.Fragment, null,
                    React.createElement('a', {
                        className: 'nav-link',
                        href: 'login.html'
                    }, 'Login'),
                    React.createElement('a', {
                        className: 'nav-link',
                        href: 'signup.html'
                    }, 'Sign Up')
                )
        )
    );
}

// GameShackTop Component - Combines Banner + Header
function GameShackTop({ currentUser, activePage, onLogout, onShowAuth }) {
    return React.createElement(React.Fragment, null,
        React.createElement(SpinningBanner, { username: currentUser?.username }),
        React.createElement(GameShackHeader, {
            currentUser,
            activePage,
            onLogout,
            onShowAuth
        })
    );
}