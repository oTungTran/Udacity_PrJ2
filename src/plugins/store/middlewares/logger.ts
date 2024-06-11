const logger = (store: any) => (next: (_: any) => any) => (action: any) => {
    console.log('Dispatching action:', action);
    const result = next(action);
    console.log('State after action:', store.getState());
    return result;
}

export default logger;
