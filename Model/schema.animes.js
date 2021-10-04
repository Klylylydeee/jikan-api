const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const mongooseFuzzySearching = require('mongoose-fuzzy-searching');

let relatedTypeSchema = new Schema({
    type: {
        type: String
    },
    name: {
        type: String
    }
})

let relatedSchema = new Schema({
    adaptation: {
        type: [relatedTypeSchema],
        default: undefined
    },
    alternative_version: {
        type: [relatedTypeSchema],
        default: undefined
    },
    alternative_setting: {
        type: [relatedTypeSchema],
        default: undefined
    },
    character: {
        type: [relatedTypeSchema],
        default: undefined
    },
    other: {
        type: [relatedTypeSchema],
        default: undefined
    },
    prequel: {
        type: [relatedTypeSchema],
        default: undefined
    },
    sequel: {
        type: [relatedTypeSchema],
        default: undefined
    },
    side_story: {
        type: [relatedTypeSchema],
        default: undefined
    },
    spin_off: {
        type: [relatedTypeSchema],
        default: undefined
    },
    summary: {
        type: [relatedTypeSchema],
        default: undefined
    },
});

let voiceActorSchema = new Schema({
    name: {
        type: String
    },
    voice_actor_img: {
        type: String
    },
    language: {
        type: String
    }
})

let charactersSchema = new Schema({
    name: {
        type: String
    },
    image_url: {
        type: String
    },
    role: {
        type: String
    },
    voice_actor: {
        type: voiceActorSchema
    }
});

let downloadSchema = new Schema({
    memory_size: {
        type: String,
        required: true
    },
    episodes_downloaded: {
        type: Number,
        required: true
    },
    type_downloaded: {
        type: String,
        required: true
    },
    quality_downloaded: {
        type: String,
        required: true
    },
    date_downloaded: {
        type: Date,
        required: true
    },
    notes: {
        type: String,
        default: undefined
    }
})

const AnimeSchema = new Schema({
    title: {
        type : String,
        required: true,
        unique: true
    },
    title_english: {
        type : String
    },
    title_japanese: {
        type : String
    },
    image_url : {
        type : String
    },
    trailer_url: {
        type : String
    },
    type: {
        type : String,
        lowercase: true,
        enum: ['tv', 'ova', 'movie', 'special', 'ona', 'music']
    },
    episodes: {
        type: Number
    },
    status: {
        type : String
    },
    duration: {
        type : String
    },
    score: {
        type: Number
    },
    synopsis: {
        type : String
    },
    background: {
        type : String
    },
    premiered: {
        type : String
    },
    genre: {
        type: String,
        lowercase: true
    },
    download_data: {
        type: downloadSchema,
        required: true
    },
    related: {
        type: relatedSchema
    },
    characters: {
        type: [charactersSchema],
        default: undefined
    }
    // characters: {
    //     type: [{
    //             name: {
    //                 type: String
    //             },
    //             image_url: {
    //                 type: String
    //             },
    //             role: {
    //                 type: String
    //             },
    //             voice_actor: {
    //                 type: voiceActorSchema
    //             }
    // //     }],
    //     default: undefined
    // }
});
  
AnimeSchema.plugin(mongooseFuzzySearching, { fields: ['title'] })
const Animes = mongoose.model('animes', AnimeSchema);

module.exports = { Animes };