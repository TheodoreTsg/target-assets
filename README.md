# Technical Assessment UI

## Introduction

Hello and welcome to my angular coding excercise! This is a first try of me after one and a half year inactive using Angular. In this project I will be using version 14.

### Duration - Challenge

I have **5 days** to complete this assessment. I have to spend **max 4 hours** in order to complete it and see how many of the tasks I can complete in this timespace.

## Background

A public JSON REST-API is available that returns a list of target assets from our postman mock server on the endpoint /targetAsset.

> What is a target asset?
> A target asset can be referred to as a remote system such as a hardware or virtual machine.

For the purposes of this task, this API will be referred to as the "TargetAsset-API". A GET-request to that resource will return some sample data in the following format:

**REST-API:** https://adb47d56-1aa9-4aa7-8ec2-77a923b80a5b.mock.pstmn.io/targetasset

```javascript
    {
        "id": number,
        "isStartable": boolean,
        "location": string,
        "owner": string,
        "createdBy": string,
        "name": string,
        "status": string,
        "tags": string[],
        "cpu": number,
        "ram": number,
        "createdAt": string,
        "parentId": number
    }
```

I will create a simple target assets dashboard given by the above data. The user should be able to see all target assets in a minimal view (show only related data), search/filter target assets and see some nice statistics (e.g. total CPU, total Memory).

Following some general advice/tips:

- **Look and feel (UI/UX):** I will use **PrimeNG** & **Boostrap**. I will try not to overdo it!
- **State Management:** Apps need to manage state and react to state changes in order to provide an engaging user experience. No experience on that, but I will try to fill in the gaps later.
- **Unit testing:** Create a few meaningful unit tests. [Jest](https://jestjs.io/) is preinstalled and ready to use.

## Tasks

1. Create a new lazy-loaded `dashboard` module which is accessible by the route `/dashboard`. For simplicity, we want that all other routes are being redirected to this module.
2. In this module, create a service, which fetches all target assets from the end point `/targetasset`.

   > **Note:** Since we do not trust our fellow backend engineers to actually return the data in the correct format, remember to make use of Typescripts language features to make sure the data fits your applications needs.

3. Render all target assets. You don't need to display all data. Just some important ones! [vCloud Example](https://thinfactory.com/wp-content/uploads/afbeelding-vcloud-director.jpg)
4. Add a loading indicator when the data are being loaded.
5. Use the target asset `status` property to highlight the target asset.
6. Add an input field where the user is able to filter the target assets by the `name` and `status` property.
7. Above the input field, add some nice statistics calculated by all target assets. e.g. Total of CPUs.
8. Add a target asset details page. This page is accessible by the route `/dashboard/assets/{:id}`. List all information in a meaningful way. You might have noticed, the target assets are bound together in a hierarchical order via their `parentId` property. Use the `parentId` information to show the `name` of the parent target asset and create a hyperlink to get to the next target asset.
