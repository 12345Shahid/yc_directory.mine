import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(`
  *[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author -> name match $search  ] | order(_createdAt desc){
    _id,
    title,
    slug,
    _createdAt,
    author->{_id,name,image,bio},
    views,
    description,
    category,
    image
  }
`);

export const STARTUP_BY_ID_QUERY = defineQuery(`*[type ==] && id == $id][0]{
id,
title,
slug,
_createdAt,
author->{_id,name,username,image,bio},
views,
description,
category,
image,
pitch,
}`);

export const STARTUP_VIEWS_QUERY =
  defineQuery(`*[_type== "startup" && _id == $id][0]{
  _id,views}`);

export const AUTHORS_BY_GITHIB_ID_QUERY =
  defineQuery(`*_type == "author" && id = $id][0]{
    _id,
    id,
    name,
    username,
    image,
    email,
    bio}`);

export const AUTHORS_BY_ID_QUERY =
  defineQuery(`*_type == "author" && _id = $id][0]{
    _id,
    id,
    name,
    username,
    image,
    email,
    bio}`);

export const STARTUPS_BY_AUTHOR_QUERY = defineQuery(`
  *[_type == "startup" && defined(slug.current) && author._ref == $id] | order(_createdAt desc){
    _id,
    title,
    slug,
    _createdAt,
    author->{_id,name,image,bio},
    views,
    description,
    category,
    image
  }
`);

export const PLAYLIST_QUERY = defineQuery(
  `*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
  _id,
  _createdAt,
  title,
  slug,
  },

  author->{_id,
  name,
  slug,
  image,
  bio},
  
  views, 
  description,
  category,
  image,
  ptch}`
);
