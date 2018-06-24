export const urlProvider = {
    endpoint: getEndpoint()
};

function getEndpoint(): string {
    if (process.argv.length != 1 && process.argv[2] == 'local') {
        return 'http://localhost:9000';
    } else {
        return 'http://ec2-52-199-201-116.ap-northeast-1.compute.amazonaws.com';
    }
}