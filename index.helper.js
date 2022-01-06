function serverSuccess() {
    console.log('✔ Application Started')
}

function serverError(error) {
    console.log('✘ Application failed to start');
    console.error('✘', err.message);
    process.exit(0);
}

module.exports = { serverSuccess, serverError }