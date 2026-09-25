import React from 'react';

class DashboardErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('[MoyAgentDashboard Error]', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 rounded-3xl bg-slate-900 border border-rose-500/40 text-center max-w-lg mx-auto my-12 space-y-4">
          <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto text-xl font-bold">
            ⚠️
          </div>
          <h3 className="text-lg font-black text-white uppercase font-heading">
            {this.props.fallbackTitle || 'Display Notice'}
          </h3>
          <p className="text-xs text-slate-300">
            {this.state.error?.message || 'An unexpected rendering issue occurred. Your data in the database remains safe.'}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              if (this.props.onReset) this.props.onReset();
            }}
            className="px-5 py-2 rounded-xl bg-[#00e5cc] text-black font-black text-xs uppercase tracking-wider hover:bg-[#24f6df] transition-all shadow-md"
          >
            Reset & Return
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export { DashboardErrorBoundary };