export default class PrimeNumberRoute {
    constructor(router) {
        this.router = router;
    }

    registerRoutes() {
        this.router
            .route('/prime-number')
            .get((request, response) => {
                response.json({
                    matrix: 'lol1'
                });
            });
    }
}
