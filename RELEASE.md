# RELEASE.md

Steps for publishing a new release to the Internal Testing track on Google Play (app: ImprovLab, package `com.kesslersoftware.improvlab`).

## 1. Bump the version

Edit `android/app/build.gradle`:

```gradle
versionCode 4        // must be strictly higher than the last uploaded release
versionName "1.0.3"  // human-readable version, bump as you like
```

## 2. Build the signed release bundle

```bash
cd android
./gradlew bundleRelease
```

Requires `IMPROVLAB_STORE_PASSWORD` and `IMPROVLAB_KEY_PASSWORD` env vars to be set, and the keystore at `android/app/improvlab-release.keystore` to be present.

Output lands at:

```
android/app/build/outputs/bundle/release/app-release.aab
```

## 3. Upload to Play Console

- Go to **Play Console → ImprovLab → Test and release → Testing → Internal testing**
- Click **Create new release**
- Upload the `app-release.aab` from step 2
- Add release notes
- Click **Save**

## 4. Roll it out

- Click **Review release**
- Click **Start rollout to Internal testing**

## 5. Testers get it automatically

- Existing testers (listed under the **Testers** tab) don't need to do anything new — the update appears in the Play Store app on their device automatically (or via **My apps & games → Updates** in the Play Store if they want it immediately)
- The **"How testers join your test"** link only needs to be shared once per tester, to opt them in initially
