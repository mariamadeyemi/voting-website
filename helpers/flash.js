function flash(type, message) {
    this.session.flash = {type, message}
}

module.exports = flash