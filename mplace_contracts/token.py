import smartpy as sp

FA2 = sp.io.import_script_from_url("https://smartpy.io/dev/templates/FA2.py")

class Token(FA2.FA2):
    pass

@sp.add_test(name = "Non Fungible Token")
def test():
    scenario = sp.test_scenario()

    admin = sp.address("tz1RpCUQmuF4Cibw1sLzrP9mqz8mpWHY5kWK")

    token_contract = Token(FA2.FA2_config(non_fungible = True), admin = admin, metadata = sp.utils.metadata_of_url("ipfs://QmW8jPMdBmFvsSEoLWPPhaozN6jGQFxxkwuMLtVFqEy6Fb"))
    
    scenario += token_contract
