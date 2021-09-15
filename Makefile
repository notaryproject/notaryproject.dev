# Keep these consistent with the values in config.yaml and layouts/index.redirects:
NEXTv=v2
LATESTv=v2

HTMLTEST?=htmltest # Specify as make arg if different
HTMLTEST_ARGS?=--skip-external
HTMLTEST_DIR=tmp

# Use $(HTMLTEST) in PATH, if available; otherwise, we'll get a copy
ifeq (, $(shell which $(HTMLTEST)))
override HTMLTEST=$(HTMLTEST_DIR)/bin/htmltest
ifeq (, $(shell which $(HTMLTEST)))
GET_LINK_CHECKER_IF_NEEDED=get-link-checker
endif
endif

check-links: $(GET_LINK_CHECKER_IF_NEEDED) link-check-prep
	$(HTMLTEST) $(HTMLTEST_ARGS)

clean-htmltest-dir:
	rm -Rf $(HTMLTEST_DIR)

build-link-checker:
	rm -Rf $(HTMLTEST_DIR)
	mkdir -p $(HTMLTEST_DIR)/bin && \
	cd $(HTMLTEST_DIR) && \
	git clone --depth=1 https://github.com/wjdp/htmltest.git && \
	( \
		cd htmltest && \
		./build.sh && \
		cp bin/htmltest ../bin \
	)

get-link-checker:
	curl https://htmltest.wjdp.uk | bash -s -- -b $(HTMLTEST_DIR)/bin

link-check-prep:
	mkdir -p $(HTMLTEST_DIR)
	rm -Rf $(HTMLTEST_DIR)/public
	cp -R public/ $(HTMLTEST_DIR)/public && \
	( \
		cd $(HTMLTEST_DIR)/public/docs; \
		ln -s $(NEXTv) next; \
		ln -s $(LATESTv) latest; \
	)
