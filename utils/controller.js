'use strict';

const controller = {};

// function that return a 405 error (method not allowed)
// and dynamically sets 'Allow' header with aallowed methods
controller.methodNotAllowed = (req, res, router) => {
    const allowedMethods = controller.getAllowedMethods(req, router);
    if (allowedMethods) res.set('Allow', allowedMethods);

    res.status(405).json({ error: `Method "${req.method}" not allowed for that route` });
}

controller.getAllowedMethods = (req, router) => {
    const routeLayer = controller.matchReqWithRouterLayer(req, router);

    if (!routeLayer) return [];

    return Object.keys(routeLayer.route.methods)
        .filter((method) => method.match(/^[a-zA-Z]+$/))
        .map(method => method.toUpperCase());
}

controller.matchReqWithRouterLayer = (req, router) => {
    // mapping through all router layers
    // a layer is defining a route, its methods, ...
    for (let layer of router.stack) {
        // if a layer is containing the route the request was for
        // return that layer so we can access its defined methods
        if (layer.route.path && layer.route.path == req.route.path) return layer;
    }
    // in case any layer was matching the request
    return null;
}

module.exports = controller;