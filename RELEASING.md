# Releasing (maintainer notes)

## Cut a release

1. Bump `"version"` in `manifest.json`.
2. Commit, tag, and push:
   `git commit -am "..." && git tag vX.Y.Z && git push && git push origin vX.Y.Z`
3. Build the package (from the parent directory):
   `zip -r ../arxiv-classic-red-X.Y.Z.zip manifest.json background.js classic-red.css icons/`
4. Create the GitHub release with the zip attached:
   `gh release create vX.Y.Z ../arxiv-classic-red-X.Y.Z.zip --title "arXiv Classic Red vX.Y.Z"`

## Publish to Microsoft Edge Add-ons

1. Register once at https://partner.microsoft.com/dashboard/microsoftedge
   (free for Edge Add-ons).
2. Upload the same zip and fill in the listing. The extension collects no
   data; declare "does not collect data" in the privacy section. The
   `scripting`/`storage` permissions and arxiv.org host access are used
   solely for the local CSS toggle.
3. Every store update requires a higher `"version"` in `manifest.json`.
