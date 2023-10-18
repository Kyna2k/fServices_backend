

const skipPage = ({perPage,page}) => {
    return (perPage * page) - perPage;
}

module.exports = {skipPage} 