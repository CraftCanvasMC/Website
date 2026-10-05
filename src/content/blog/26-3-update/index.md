---
title: Canvas 26.3
description: The 26.3 update recap from the CanvasMC team!
date: 2026-10-05
image: ./cover.png
author: Dueris
tags: [Announcement, Update, Minecraft]
---

:::severe

As usual, backups are **absolutely mandatory!**

:::

Hello hello! It's update day! Thank you to everyone that worked on this update, tested
things, reported bugs, etc. This update is a big one!

## Overview

In general, not much changed with Canvas besides a *lot* of bug fixes. BUT we do have
some fun new features we are planning to roll out soon! For starters, we've been
working internally on a "VVD" system, which is sorta like a fake chunk system allowing
to extend the view distance of the server with less resource cost. This is still in
testing and needs more polish before it's merged in the 26.3 branch though. Here is
a picture of what that looks like in-game so far:

![vvd.png](vvd.png)

:::note

The distance you see here is roughly 120 chunk VVD, and 8 chunks of normal
view distance on the server, with the client at 128 chunk render distance.

<small>Please do not ever set your VVD distance this high...</small>

:::

Pretty crazy, yeah?

We are also looking to rewrite and polish a lot of the region threading patch. Given
we are no longer upstreaming from Folia, we plan to try and revamp and polish the
core region threading patch wholesale, trying to make it more efficient, clean, and
flexible. One of the first things we will be doing is a general code cleanup that will
just consist of formatting consistency changes, since Folias and Canvas' code formats
differ in a few ways.

The next thing we will be doing is rewriting the portal logic handling a bit. Not
rewriting wholesale, but more modifying the system to be more flexible and extendable
and not hundreds of lines long methods in a single class handling everything. We
primarily want to do this in preparation for Minecrafts new dimension, The Sift. With
these changes we will be able to more easily add support for that portal since the
system will be generally a bit more flexible and abstract.

## Bugs Fixed

Canvas 26.3 introduces a **ton** of bug fixes for *both* Folia and Canvas:
- General 26.3 update fixes. Dueris did research prior to the update to discern what
  needed changes. This helped reduce the amount of bugs found by a *TON*. Includes:
  - Thread check post effects implementation
  - Move the randomstate garbage collection to the global tick
  - Add `CommandResponseTracker` types to the `ACE` command framework we built
    - We also modified the `CommandResponseTracker` class to be thread-safe for
      future-proofing, however we use the `ACE` API in replacement for all usages
  - Replace the server schedule call to the entity scheduler call in
    `ServerCommandSuggestionsProvider#trySchedule`
  - Thread check `LivingEntity#startSleeping`
  - Make `PlayerList#playerPermissions` field a CHM. Has no usages, but changed for
    future-proofing this field
  - Properly handle `canRandomlyTeleportTo` to prevent randomly teleporting out of
    region ever.
  - Regionize `posteffects` command
  - Replace `Entity#teleportToPortalDestination` body with an `USO` throw.
    - This was a new method added, extracting some code already replaced in Folia
      to make spectators able to click portals to go through them. The caller for
      spectators handling has also been rewritten to be properly threaded.
- (*Folia fix*) Fix inventory holders that have viewing players being unloaded
  causing off region viewers to trip thread checks.
- (*Canvas fix*) If the plugin changes the teleport destination via our API, we need
  to update whether or not the target is the same region.
- Log game profile name in entity context checks
- (*Folia fix*) Close inventories and stop trading on common teleport
- (*Folia fix*) Autosave command storage
- (*Folia fix*) Autosave maps properly
- Apply an initial offset to world autosave points to try and spread the autosave
  intervals over the period rather than all of them at once
- (*Folia/Canvas fix*) Restore the `SERVER` data accessor in the `data` command
- (*Folia fix*) Purge function conditional from the `execute` command
- (*Folia fix*) Fix thread violation in `OwnerHurtByTargetGoal`
- (*Folia fix*) Fix and limit the `execute` command to be safer for region threading
- Refactor scheduler lifecycle
- (*Folia fix*) Reimplement debug subscribers
- (*Folia fix*) Restore tick time sampling for clients using the TPS graph in F3
- (*Folia fix*) Fix wrong value being passed into the target buffer
  - Note: while this is technically unused, it's best to fix this anyway in the case
    of *something* using this down the line
- (*Folia fix*) Fix region threading issues with certain packets
  - `ServerboundSetStructureBlockPacket` when the position is out of region
  - `ServerboundSetTestBlockPacket` when the position is out of region
  - `ServerboundTestInstanceBlockActionPacket` when the position is out of region
  - `ServerboundSetJigsawBlockPacket` when the position is out of region
  - `ServerboundBlockEntityTagQueryPacket` when the block entity is out of region
  - `ServerboundEntityTagQueryPacket` when the entity is out of region
  - `ServerboundSignUpdatePacket` when the sign position is out of region
- (*Folia fix*) Fix all Minecraft debug commands
- (*Folia fix*) Fix `PlayerBucketEmptyEvent` threading issue
- (*Folia fix*) Fix `BlockLockCheckEvent` threading issue
- (*Folia fix*) Make `MobGoalHelper.GENERIC_TYPE_CACHE` a CHM
- (*Folia fix*) Make `CraftSoundGroup.SOUND_GROUPS` a CHM
- (*Folia/Canvas fix*) Make `CraftPlayer#getPluginWeakReference` synchronized
- (*Folia fix*) Fix dolphins trying to add effects to off-region players

It is worth noting a *lot* of these are applicable to 26.2, and we will do a backport
update with a lot of the applicable fixes sometime in the future.

## Changes for server owners
- The ranged-attack config was renamed and now affects all ranged mobs.
- `filter-move-packets` and our `MC-298464` fix were removed
- `autosave-command-storage` now exists. Command storage and maps now properly save
  and each world's autosave is now offset so they don't all save at once
- The `execute` command is a bit more limited now
  - There is a new conditional, `regionof`, Canvas-exclusive, so you can execute
    things like `/execute if regionof <entity or columnpos>...`
- The `compute` command(introduced in 26.3) is disabled, and `posteffect` has been
  added and properly implemented for region threading

## Changes for plugin developers
- The `TeleportType` has been removed from the `TeleportAsync` events.
- New alternative API is available for `getRespawnLocation`, `getRespawnLocationAsync`
  - This was created because verification of the respawn position is not safe for
    region threading when the position is out of region. So we have added this API
    for plugin developers to recieve a `CompletableFuture` that provides the respawn
    location with optional verification

---

Thank you very much to everyone who helped with this update. We at CanvasMC hope you
enjoy the new update, happy crafting!

:::info

Download 26.3 at our [downloads page](https://canvasmc.io/downloads/canvas)

:::

*- The CanvasMC Team*