

const skipPage = ({perPage,page}) => {
    const skip = (perPage * page) - perPage;
    return skip;
}

module.exports = {skipPage} 