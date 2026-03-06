import React from 'react';

export default class MarketplaceErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('[Marketplace Error Boundary]', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 text-center max-w-md mx-auto mt-8">
                    <div className="text-4xl mb-4">🎪</div>
                    <h3 className="text-xl font-bold text-white mb-2">Marketplace Unavailable</h3>
                    <p className="text-gray-400 text-sm mb-6">
                        Something went wrong loading the marketplace. The rest of the app is unaffected.
                    </p>
                    <button
                        onClick={() => this.setState({ hasError: false, error: null })}
                        className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full text-sm hover:opacity-90 transition-opacity"
                    >
                        Try Again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
