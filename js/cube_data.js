/*

    center cubes
    -------------

    center_yellow (in front of) center_white
    center_blue (in front of) center_green
    center_orange (in front of) center_red

    corner cobes
    -------------

    corner_rwb, corner_rby, corner_ryg, corner_rgw
    corner_obw, corner_owg, corner_ogy, corner_oyb

    edge cobes
    ----------

    edge_gw, corner_gr, corner_gy, corner_go
    edge_bo, edge_bw, edge_br, edge_by
    edhe_ow, edge_wr, edge_ry, edge_yo

    overall 26 cubes
    ----------------



*/



var cubes = [{
        id: 1,
        name:"c000",
        type: "corner",
        position:[0,0,0],
        colors: "nybnrn",
        altPosition: [0,0,0]
    },{
        id: 2,
        name:"c100",
        type: "edge",
        position:[1,0,0],
        colors: "nnbnrn",
        altPosition: [0,0,0]
    },{
        id: 3,
        name:"c200",
        type: "corner",
        position:[2,0,0],
        colors: "wnbnrn",
        altPosition: [0,0,0]
    },{
        id: 4,
        name:"c010",
        type: "edge",
        position:[0,1,0],
        colors: "nynnrn",
        altPosition: [0,0,0]
    },{
        id: 5,
        name:"c110",
        type: "center",
        position:[1,1,0],
        colors: "nnnnrn",
        altPosition: [0,0,0]
    },{
        id: 6,
        name:"c210",
        type: "edge",
        position:[2,1,0],
        colors: "wnnnrn",
        altPosition: [0,0,0]
    },{
        id: 7,
        name:"c020",
        type: "corner",
        position:[0,2,0],
        colors: "nyngrn",
        altPosition: [0,0,0]
    },{
        id: 8,
        name:"c120",
        type: "edge",
        position:[1,2,0],
        colors: "nnngrn",
        altPosition: [0,0,0]
    },{
        id: 9,
        name:"c220",
        type: "corner",
        position:[2,2,0],
        colors: "wnngrn",
        altPosition: [0,0,0]
    },{
        id: 10,
        name:"c001",
        type: "edge",
        position:[0,0,1],
        colors: "nybnnn",
        altPosition: [0,0,0]
    },{
        id: 11,
        name:"c101",
        type: "center",
        position:[1,0,1],
        colors: "nnbnnn",
        altPosition: [0,0,0]
    },{
        id: 12,
        name:"c201",
        type: "edge",
        position:[2,0,1],
        colors: "wnbnnn",
        altPosition: [0,0,0]
    },{
        id: 13,
        name:"c011",
        type: "center",
        position:[0,1,1],
        colors: "nynnnn",
        altPosition: [0,0,0]
    },{
        id: 14,
        name:"c211",
        type: "center",
        position:[2,1,1],
        colors: "wnnnnn",
        altPosition: [0,0,0]
    },{
        id: 15,
        name:"c021",
        type: "edge",
        position:[0,2,1],
        colors: "nyngnn",
        altPosition: [0,0,0]
    },{
        id: 16,
        name:"c121",
        type: "center",
        position:[1,2,1],
        colors: "nnngnn",
        altPosition: [0,0,0]
    },{
        id: 17,
        name:"c221",
        type: "edge",
        position:[2,2,1],
        colors: "wnngnn",
        altPosition: [0,0,0]
    },{
        id: 18,
        name:"c002",
        type: "corner",
        position:[0,0,2],
        colors: "nybnno",
        altPosition: [0,0,0]
    },{
        id: 19,
        name:"c102",
        type: "edge",
        position:[1,0,2],
        colors: "nnbnno",
        altPosition: [0,0,0]
    },{
        id: 20,
        name:"c202",
        type: "corner",
        position:[2,0,2],
        colors: "wnbnno",
        altPosition: [0,0,0]
    },{
        id: 21,
        name:"c012",
        type: "edge",
        position:[0,1,2],
        colors: "nynnno",
        altPosition: [0,0,0]
    },{
        id: 22,
        name:"c112",
        type: "center",
        position:[1,1,2],
        colors: "nnnnno",
        altPosition: [0,0,0]
    },{
        id: 23,
        name:"c212",
        type: "edge",
        position:[2,1,2],
        colors: "wnnnno",
        altPosition: [0,0,0]
    },{
        id: 24,
        name:"c022",
        type: "corner",
        position:[0,2,2],
        colors: "nyngno",
        altPosition: [0,0,0]
    },{
        id: 25,
        name:"c122",
        type: "edge",
        position:[1,2,2],
        colors: "nnngno",
        altPosition: [0,0,0]
    },{
        id: 26,
        name:"c222",
        type: "corner",
        position:[2,2,2],
        colors: "wnngno",
        altPosition: [0,0,0]
}];