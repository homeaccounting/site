{
  description = "homeaccounting/site — the HomeAccounting landing site (Astro)";
  inputs.nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  outputs =
    { nixpkgs, ... }:
    let
      forAllSystems =
        f:
        nixpkgs.lib.genAttrs [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ]
          (system: f { pkgs = nixpkgs.legacyPackages.${system}; });
    in
    {
      formatter = forAllSystems ({ pkgs }: pkgs.nixfmt-rfc-style);
      devShells = forAllSystems (
        { pkgs }:
        {
          default = pkgs.mkShell {
            packages = [ pkgs.nodejs_22 pkgs.pnpm pkgs.just pkgs.lychee ];
          };
        }
      );
    };
}
