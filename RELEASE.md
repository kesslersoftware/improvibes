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

## Secrets & keys checklist

None of these are stored in git. This is a pointer to where each one lives, for rebuilding on a new machine.

- **Release keystore** — `android/app/improvlab-release.keystore`. Not recoverable if lost; every future release must be signed with this same key. Back it up somewhere durable (password manager attachment, encrypted archive, secure cloud storage) — see `publishing_to_playstore.txt` for the actual backup location.
- **Keystore passwords** — `IMPROVLAB_STORE_PASSWORD` and `IMPROVLAB_KEY_PASSWORD` environment variables, plus the key alias `improvlab` (not secret, already in `build.gradle`). Values live in the password manager referenced in `publishing_to_playstore.txt`.
- **Google Sheets API key** — `src/utils/keys.ts` (gitignored). Copy `src/utils/keys.example.ts` to `src/utils/keys.ts` and fill in the real value. The key is restricted to the Sheets API, scoped to this app's package name + signing fingerprint. Regenerate or retrieve it via Google Cloud Console on the business Google account.
- **Sheet ID** — `src/config.ts` (committed, not secret). Copy `src/config.example.ts` to `src/config.ts` if missing and fill in the Sheet ID.
- **Play Console access** — published under the **organization** Google Play Console account (not the personal one on the same email). Additional publishers are managed via Play Console → Users and permissions.
- **Detailed publishing walkthrough** — `C:\Users\dylan\Desktop\business\publishing_to_stores\Android\publishing_to_playstore.txt` (outside the repo, not tracked in git).
